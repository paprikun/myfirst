let htmlReporter = require ('cucumber-html-reporter');

module.exports = {
	after: function(done){
		var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber.json',
        output: 'reports/cucumber.html',
        reportSuiteAsScenarios: true,
        launchReport: true,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
 
    htmlReporter.generate(options);
    done();
	}
}