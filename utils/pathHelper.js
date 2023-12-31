const NodeCache = require("node-cache");
const claimsCache = new NodeCache();
const constants = require("../utils/consts")

function getPath(relativePath) {

    let basePath; //this should be called in the server

    // console.log("before the base path is :: " + basePath)

    if(!basePath){ //this should be called on the server since the first request, will be ssr
        basePath= constants.BASE_PATH;
    }

    // console.log("the base path is :: " + basePath)


    if(basePath){
        return `/${basePath}/${relativePath}`
    }

    return relativePath

}

export { getPath };