function sectorAlias(sector) {
    if (sector.info && isStr(sector.info.alias)) return sector.info.alias

    const at = sector.name.indexOf('-')
    return sector.name.substring(at + 1)
}

const _sector = {
    name: 'sector',

    registry:  {},
    menuList:  [],

    catalog: function() {
        const _ = this
        this._ls.forEach((sector, i) => {
            // normalize alias
            sector.id    = i
            sector.title = sector.title ?? sector.info.title
            sector.alias = sectorAlias(sector)
            if (_.registry[sector.alias]) throw new Error(`Sector alias collision for [${sector.alias}]`)

            if (i === 0) {
                _.default = sector
            } else {
                _.registry[sector.alias] = sector

                _.menuList.push({
                    id:    sector.id,
                    title: `${sector.id} - ${sector.title}`
                })
            }
        })
    },

    locate: function(id) {
        if (isNum(id)) return this._ls[id]

        const nid = parseInt(id)
        if (isNaN(nid)) {
            // expect an alias
            this.registry[id]
        } else {
            return this._ls[nid]
        }
    },
}
