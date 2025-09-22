// Storage management utilities for handling FILE_ERROR_NO_SPACE and related issues

export interface StorageInfo {
  used: number
  available: number
  quota: number
  percentage: number
}

export class StorageManager {
  static async getStorageInfo(): Promise<StorageInfo | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate()
        const quota = estimate.quota || 0
        const usage = estimate.usage || 0
        const available = quota - usage
        const percentage = quota > 0 ? (usage / quota) * 100 : 0
        
        return {
          used: usage,
          available: available,
          quota: quota,
          percentage: percentage
        }
      } catch (error) {
        console.warn('Failed to get storage estimate:', error)
      }
    }
    return null
  }
  
  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  static isStorageFull(): Promise<boolean> {
    return this.getStorageInfo().then(info => {
      return info ? info.percentage > 90 : false
    })
  }
  
  static clearCaches(): Promise<void> {
    return new Promise((resolve) => {
      const promises: Promise<void>[] = []
      
      // Clear localStorage safely
      try {
        // Keep essential data but clear cache entries
        const keysToKeep = ['admin_session', 'language', 'theme']
        const keysToRemove: string[] = []
        
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key && !keysToKeep.includes(key)) {
            keysToRemove.push(key)
          }
        }
        
        keysToRemove.forEach(key => {
          localStorage.removeItem(key)
        })
      } catch (error) {
        console.warn('Failed to clear localStorage:', error)
      }
      
      // Clear sessionStorage
      try {
        sessionStorage.clear()
      } catch (error) {
        console.warn('Failed to clear sessionStorage:', error)
      }
      
      // Clear caches API if available
      if ('caches' in window) {
        promises.push(
          caches.keys().then(names => {
            return Promise.all(
              names.map(name => caches.delete(name))
            )
          }).then(() => {})
        )
      }
      
      Promise.all(promises).finally(() => resolve())
    })
  }
  
  static async cleanupIndexedDB(): Promise<void> {
    if ('indexedDB' in window) {
      try {
        const databases = await indexedDB.databases()
        const deletePromises = databases.map(db => {
          if (db.name && !db.name.includes('essential')) {
            return new Promise<void>((resolve) => {
              const deleteReq = indexedDB.deleteDatabase(db.name!)
              deleteReq.onsuccess = () => resolve()
              deleteReq.onerror = () => resolve() // Continue even if deletion fails
            })
          }
          return Promise.resolve()
        })
        
        await Promise.all(deletePromises)
      } catch (error) {
        console.warn('Failed to cleanup IndexedDB:', error)
      }
    }
  }
  
  static async performFullCleanup(): Promise<void> {
    console.log('Performing full storage cleanup...')
    
    await Promise.all([
      this.clearCaches(),
      this.cleanupIndexedDB()
    ])
    
    console.log('Storage cleanup completed')
  }
  
  // Monitor storage and show warnings
  static async monitorStorage(): Promise<void> {
    const info = await this.getStorageInfo()
    if (info && info.percentage > 80) {
      console.warn(`Storage usage high: ${info.percentage.toFixed(1)}% (${this.formatBytes(info.used)} / ${this.formatBytes(info.quota)})`)
      
      if (info.percentage > 95) {
        // Auto cleanup if critically full
        await this.clearCaches()
      }
    }
  }
  
  // Check if storage error is likely
  static isLowSpace(threshold: number = 90): Promise<boolean> {
    return this.getStorageInfo().then(info => {
      if (!info) return false
      return info.percentage > threshold
    })
  }
}

// Auto-monitor storage on load
if (typeof window !== 'undefined') {
  // Monitor every 30 seconds
  setInterval(() => {
    StorageManager.monitorStorage().catch(console.warn)
  }, 30000)
  
  // Initial check
  StorageManager.monitorStorage().catch(console.warn)
}