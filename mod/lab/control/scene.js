function clearAll() {
    const port = lab.port
    lab.port._ls.forEach(e => {
        if (!e.transient) port.detach(e)
    })
}
