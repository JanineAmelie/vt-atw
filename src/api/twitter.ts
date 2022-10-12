// import { Client } from "twitter-api-sdk";
// const token = "Bearer BEARER_TOKEN"; // Replace BEARER_TOKEN with your token
// const method = "GET";

// // const endpoint =
// // const options = {
// //   method: method,
// //   headers: {
// //     "Content-type": "application/json",
// //     Authorization: token
// //   }
// // };

// const searchTwitterUser = async () => {
//   const client = new Client(process.env.BEARER_TOKEN as string);

//   const response = await client.users.findUsersById({
//     ids: ["ninineen_"],

//     "user.fields": ["description", "entities", "id", "name", "profile_image_url", "username"]
//   });

//   console.log("response", JSON.stringify(response, null, 2));
//   const consumer_key = process.env.REACT_APP_TWITTER_API_KEY;
//   const consumer_secret = process.env.REACT_APP_TWITTER_SECRET;
//   const bearerToken = process.env.REACT_APP_TWITTER_BEARER_TOKEN;

//   //   try {
//   //     const response = await fetch(
//   //       `https://api.twitter.com/1.1/search/tweets.json?q=${query}`,
//   //       options
//   //     );
//   //     const data = await response.json();
//   //     console.log(data);
//   //   } catch (error) {
//   //     console.log("ERROR");
//   //   }
// };

export {};
