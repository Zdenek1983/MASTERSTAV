// Enhanced storage management utilities for handling FILE_ERROR_NO_SPACE and related issues

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
  
  static async isStorageFull(): Promise<boolean> {
    const info = await this.getStorageInfo()
    return info ? info.percentage > 90 : false
  }
  
  static async clearCaches(): Promise<void> {
    console.log('Clearing caches...')
    const promises: Promise<void>[] = []
    
    // Clear localStorage safely - keep essential data
    try {
      const keysToKeep = ['admin_session', 'language', 'theme']
      const keysToRemove: string[] = []
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && !keysToKeep.includes(key)) {
          keysToRemove.push(key)
        }
      }
      
      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key)
        } catch (error) {
          console.warn(`Failed to remove ${key}:`, error)
        }
      })
      
      console.log(`Cleared ${keysToRemove.length} localStorage keys`)
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
    
    // Clear sessionStorage
    try {
      sessionStorage.clear()
      console.log('Cleared sessionStorage')
    } catch (error) {
      console.warn('Failed to clear sessionStorage:', error)
    }
    
    // Clear caches API if available
    if ('caches' in window) {
      promises.push(
        caches.keys().then(names => {
          console.log(`Found ${names.length} caches to clear`)
          return Promise.all(
            names.map(name => 
              caches.delete(name).then(() => 
                console.log(`Cleared cache: ${name}`)
              ).catch(error => 
                console.warn(`Failed to clear cache ${name}:`, error)
              )
            )
          )
        }).then(() => {})
      )
    }
    
    await Promise.all(promises)
    console.log('Cache clearing completed')
  }
  
  static async cleanupIndexedDB(): Promise<void> {
    if ('indexedDB' in window) {
      try {
        const databases = await indexedDB.databases()
        console.log(`Found ${databases.length} IndexedDB databases`)
        
        const deletePromises = databases.map(db => {
          if (db.name && !db.name.includes('essential')) {
            return new Promise<void>((resolve) => {
              console.log(`Deleting database: ${db.name}`)
              const deleteReq = indexedDB.deleteDatabase(db.name!)
              deleteReq.onsuccess = () => {
                console.log(`Deleted database: ${db.name}`)
                resolve()
              }
              deleteReq.onerror = () => {
                console.warn(`Failed to delete database: ${db.name}`)
                resolve() // Continue even if deletion fails
              }
            })
          }
          return Promise.resolve()
        })
        
        await Promise.all(deletePromises)
        console.log('IndexedDB cleanup completed')
      } catch (error) {
        console.warn('Failed to cleanup IndexedDB:', error)
      }
    }
  }
  
  static async performFullCleanup(): Promise<void> {
    console.log('🧹 Performing full storage cleanup...')
    
    try {
      await Promise.all([
        this.clearCaches(),
        this.cleanupIndexedDB()
      ])
      
      const info = await this.getStorageInfo()
      if (info) {
        console.log(`📊 Storage after cleanup: ${info.percentage.toFixed(1)}% (${this.formatBytes(info.used)} / ${this.formatBytes(info.quota)})`)
      }
      
      console.log('✅ Storage cleanup completed successfully')
    } catch (error) {
      console.error('❌ Storage cleanup failed:', error)
    }
  }
  
  // Monitor storage and show warnings
  static async monitorStorage(): Promise<void> {
    try {
      const info = await this.getStorageInfo()
      if (info) {
        if (info.percentage > 95) {
          console.error(`🚨 Storage critically full: ${info.percentage.toFixed(1)}% (${this.formatBytes(info.used)} / ${this.formatBytes(info.quota)})`)
          console.log('🧹 Performing automatic cleanup...')
          await this.clearCaches()
        } else if (info.percentage > 80) {
          console.warn(`⚠️ Storage usage high: ${info.percentage.toFixed(1)}% (${this.formatBytes(info.used)} / ${this.formatBytes(info.quota)})`)
        } else {
          console.info(`📊 Storage usage: ${info.percentage.toFixed(1)}% (${this.formatBytes(info.used)} / ${this.formatBytes(info.quota)})`)
        }
      }
    } catch (error) {
      console.warn('Failed to monitor storage:', error)
    }
  }
  
  // Check if storage error is likely
  static async isLowSpace(threshold: number = 90): Promise<boolean> {
    const info = await this.getStorageInfo()
    if (!info) return false
    return info.percentage > threshold
  }
  
  // Emergency cleanup for FILE_ERROR_NO_SPACE
  static async emergencyCleanup(): Promise<void> {
    console.log('🆘 Emergency storage cleanup initiated')
    
    // More aggressive cleanup
    try {
      // Clear ALL localStorage except critical items
      const criticalKeys = ['admin_session']
      const allKeys = Object.keys(localStorage)
      
      allKeys.forEach(key => {
        if (!criticalKeys.includes(key)) {
          try {
            localStorage.removeItem(key)
          } catch (error) {
            // Ignore errors during emergency cleanup
          }
        }
      })
      
      // Clear all session storage
      try {
        sessionStorage.clear()
      } catch (error) {
        // Ignore errors
      }
      
      // Clear all caches
      if ('caches' in window) {
        const cacheNames = await caches.keys()
        await Promise.all(
          cacheNames.map(name => 
            caches.delete(name).catch(() => {})
          )
        )
      }
      
      // Clear all IndexedDB
      if ('indexedDB' in window) {
        try {
          const databases = await indexedDB.databases()
          await Promise.all(
            databases.map(db => 
              db.name ? new Promise<void>(resolve => {
                const deleteReq = indexedDB.deleteDatabase(db.name!)
                deleteReq.onsuccess = () => resolve()
                deleteReq.onerror = () => resolve()
              }) : Promise.resolve()
            )
          )
        } catch (error) {
          // Ignore errors during emergency cleanup
        }
      }
      
      console.log('✅ Emergency cleanup completed')
    } catch (error) {
      console.error('❌ Emergency cleanup failed:', error)
    }
  }
}

// Auto-monitor storage
if (typeof window !== 'undefined') {
  // Monitor every 30 seconds
  const monitorInterval = setInterval(() => {
    StorageManager.monitorStorage().catch(console.warn)
  }, 30000)
  
  // Clear interval when page unloads
  window.addEventListener('beforeunload', () => {
    clearInterval(monitorInterval)
  })
  
  // Listen for storage events
  window.addEventListener('storage', () => {
    StorageManager.monitorStorage().catch(console.warn)
  })
  
  // Handle quota exceeded errors
  window.addEventListener('error', (event) => {
    if (event.message?.includes('QuotaExceededError') || 
        event.message?.includes('FILE_ERROR_NO_SPACE')) {
      console.error('💾 Storage quota exceeded, performing emergency cleanup...')
      StorageManager.emergencyCleanup().then(() => {
        console.log('🔄 Consider refreshing the page')
      })
    }
  })
  
  // Initial check
  StorageManager.monitorStorage().catch(console.warn)
}