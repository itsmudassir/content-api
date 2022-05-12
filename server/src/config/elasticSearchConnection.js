import elasticsearch from "elasticsearch";

// Core ES variables for this project
export const index = "content_system_v3";
const type = "_doc";



const host = "http://43.251.253.107:2500";

//  const host = "https://x8dkko05bk:nw4qm909rg@content-system-v4-4554244877.us-west-2.bonsaisearch.net:443";


//  const host = "https://s0oskhnou6:l7y6497d4v@contentgizmo-9661164665.us-east-1.bonsaisearch.net:443";

// export const client = new elasticsearch.Client({
//   host: host,
//   ssl:{ rejectUnauthorized: false, pfx: [] } 
// });


// incase of   // const host = "http://43.251.253.107:1200"; use the code below

export const client = new elasticsearch.Client({
  host: host

});


// /* Check the ES connection status /
export const checkConnection = async () => {
  let isConnected = false;
  while (!isConnected) {
    console.log("Connecting to ES");
    try {
      const health = await client.cluster.health({});
      return health;
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log("Connection Failed, Retrying...", err);
    }
  }
};
