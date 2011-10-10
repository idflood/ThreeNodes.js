#!/bin/bash


cd NodeSoundInput/applet/
keytool -delete -alias nodekey
keytool -genkey -alias nodekey -validity 10000 -keypass f48we1s364s4d5f4s64e541fs3d4f8e -storepass asdhvcvoyhekwbjekfbjkls -dname "cn=David Mignot, ou=experiment, o=idfdlood, c=US"
keytool -selfcert -keystore myKeyStore -alias nodekey -storepass asdhvcvoyhekwbjekfbjkls

FILES=`find . -name "*.jar"`

for f in $FILES ;
do
  echo $f
  jarsigner -keypass f48we1s364s4d5f4s64e541fs3d4f8e -storepass asdhvcvoyhekwbjekfbjkls -keystore myKeyStore $f nodekey
done
