angular.module('templates-main', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("demo-templates",
    "<script type=text/ng-template id=timerTemplate.html><div>{{timer.time}}</div></script><script type=text/ng-template id=videoTemplate.html><video id=\"video\" class=\"video-full-screen\" preload=\"none\" webkit-playsinline>\n" +
    "            <source id=\"mp4\" ng-src=\"{{ video.videoDataUrlMp4 }}\" type=\"video/mp4\">\n" +
    "            <p>Your user agent does not support the HTML5 Video element.</p>\n" +
    "    </video></script>");
}]);
