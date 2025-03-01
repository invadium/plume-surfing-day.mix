function clearAll() {
    const port = lab.port
    lab.port._ls.forEach(e => {
        if (e['transient']) return
        defer(() => {
            //log('--- detaching ' + e.name)
            port.detach(e)
        })
    })
}
