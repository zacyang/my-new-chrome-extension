function addScreenShot(pageInfo, imgURL) {
    var desc = pageInfo["height"] + " * " + pageInfo["width"];
    $("#result-table > tbody:last").after("<tr><td>" + desc + "</td><td><img src=" + imgURL + "></td></tr>");
}
