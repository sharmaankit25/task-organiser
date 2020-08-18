#!/bin/sh
yarn build

cap sync android

cap open android

echo "Android Build Completed.."
exit
