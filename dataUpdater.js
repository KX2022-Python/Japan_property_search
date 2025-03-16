// 数据更新服务
class PropertyUpdater {
  constructor(scraper, integrator) {
    this.scraper = scraper;
    this.integrator = integrator;
    this.lastUpdate = null;
  }

  // 更新所有数据源的数据
  async updateAll() {
    try {
      const startTime = new Date();
      const updates = {
        total: 0,
        new: 0,
        updated: 0,
        sources: {}
      };

      // 从每个数据源获取数据
      for (const [source, url] of Object.entries(this.scraper.sources)) {
        const sourceUpdates = await this.updateSource(source, url);
        updates.total += sourceUpdates.total;
        updates.new += sourceUpdates.new;
        updates.updated += sourceUpdates.updated;
        updates.sources[source] = sourceUpdates;
      }

      this.lastUpdate = startTime;
      return updates;
    } catch (error) {
      console.error('数据更新失败:', error);
      throw error;
    }
  }

  // 检查是否有新数据
  async checkForUpdates() {
    const updates = {
      hasUpdates: false,
      sources: {}
    };

    for (const [source, url] of Object.entries(this.scraper.sources)) {
      const hasSourceUpdates = await this.checkSourceUpdates(source, url);
      updates.hasUpdates = updates.hasUpdates || hasSourceUpdates;
      updates.sources[source] = hasSourceUpdates;
    }

    return updates;
  }
} 