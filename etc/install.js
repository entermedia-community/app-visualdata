importPackage( Packages.com.openedit.util );
importPackage( Packages.java.util );
importPackage( Packages.java.lang );
importPackage( Packages.com.openedit.modules.update );

var zip = "http://dev.entermediasoftware.com/jenkins/job/app-visualdata/lastSuccessfulBuild/artifact/deploy/app-visualdata.zip";

var root = moduleManager.getBean("root").getAbsolutePath();
var visualdata = root + "/visualdata";
var tmp = root + "/WEB-INF/tmp";

log.add("1. GET THE LATEST ZIP FILE");
var downloader = new Downloader();
downloader.download( zip, tmp + "/visualdata.zip");

log.add("2. UNZIP WAR FILE");
var unziper = new ZipUtil();
unziper.unzip(  tmp + "/visualdata.zip",  tmp );

var files = new FileUtils();
log.add("4. UPGRADE BASE DIR");
files.deleteAll( root + "/visualdata");
files.copyFiles( tmp + "/visualdata", root + "/visualdata/");

log.add("5. CLEAN UP");
files.deleteAll(tmp);

log.add("6. UPGRADE COMPLETED");