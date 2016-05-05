(function(abot) {
abot.TableItemToken = {}
abot.TableItemToken.controller = function(pctrl, args) {
	var ctrl = this
	ctrl.deleteToken = function() {
		var c = confirm("Are you sure you want to delete this token?")
		if (!c) {
			ev.preventDefault()
			return
		}
		// Remove the row from the table
		this.parentNode.parentNode.remove()
		abot.request({
			url: "/api/users/auth_token.json",
			method: "DELETE",
			data: { Token: args.Token },
		}).then(function() {
			pctrl.props.successToken("Success! Deleted token.")
		}, function(err) {
			pctrl.props.errorToken("Error! Failed to delete token. Err: " + err.Msg)
		})
	}
}
abot.TableItemToken.view = function(ctrl, _, args) {
	return m("tr", [
		m("td", m("a[href=#/].btn-x", { onclick: ctrl.deleteToken }, "X")),
		m("td", args.Token),
		m("td.hidden-small", m("small", abot.prettyTime(args.CreatedAt))),
	])
}
})(!window.abot ? window.abot={} : window.abot);
