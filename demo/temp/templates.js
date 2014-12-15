angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("demo-templates",
    "<script type=text/ng-template id=timerTemplate.html><div class=\"timer\">{{timer.time}}</div></script><script type=text/ng-template id=videoTemplate.html><video id=\"video\" class=\"video-full-screen\" controls=\"true\">\n" +
    "            <source id=\"mp4\" ng-src=\"{{ videoDataUrlMp4 }}\" type=\"video/mp4\">\n" +
    "            <p>Your user agent does not support the HTML5 Video element.</p>\n" +
    "    </video></script><script type=text/ng-template id=videoPageTemplate.html><div>\n" +
    "		<demo-timer></demo-timer>\n" +
    "   		<demo-video video-data=\"videoPageCtrl.videoData\"><demo-video>\n" +
    "	</div></script>");
}]);
