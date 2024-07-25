const report = require("multiple-cucumber-html-reporter")

var today = new Date()

var date =
	today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear()

var time =
	today.getHours() + "h" + today.getMinutes() + "m" + today.getSeconds() + "s"

var dateTime = date + "_" + time

report.generate({
	jsonDir: "cypress/cucumber-json/",

	reportPath: "cypress/reports/MultipleReport_" + dateTime + ".html",

	metadata: {
		browser: {
			name: "firexox",

			version: "123.0",
		},

		device: "Local test machine",

		platform: {
			name: "Windows",

			version: "11",
		},
	},

	customData: {
		title: "Run info",

		data: [
			{ label: "Project", value: "Diligência" },

			{ label: "Release", value: "1.0.1" },

			{ label: "Execution", value: dateTime },
		],
	},
})