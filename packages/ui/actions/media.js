// "use server";
// import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });
// import path from "path";
// import axios from "axios";
// import { Storage } from "@google-cloud/storage";
// import fs from "fs";
// import mime from "mime-types";

// export const uploadImagesByUrl = async (arr, site, folder) => {
// 	try {
// 		const __dirname = path.resolve();
// 		const storage = new Storage({
// 			keyFilename: path.join(__dirname, "../../storage.json"),
// 			projectId: "coupon-website-main",
// 		});
// 		const bucket = storage.bucket("mediaa");

// 		const uploadedData = [];

// 		const upload = await arr?.map(async (item) => {
// 			try {
// 				const response = await axios.get(item.url, { responseType: "arraybuffer" });
// 				const imageData = Buffer.from(response.data, "binary");
// 				let extension = await mime.lookup(item.url);
// 				extension = extension.split("/")[1];

// 				const size = Buffer.byteLength(imageData, "binary");

// 				// let extension = url.split(".").pop();
// 				const randomSuffix = Math.floor(Math.random() * 1000000);
// 				let rawFilename = url.split("/").pop().split(".")[0];
// 				if (req.body.title) {
// 					rawFilename = slugify(tr(req.body.title));
// 				}

// 				if (item?.filename) {
// 					rawFilename = slugify(tr(item.filename));
// 				}
// 				const newFilename = `${site}/${folder}/${rawFilename}_${randomSuffix}.${extension}`;
// 				const fileUpload = bucket.file(newFilename);

// 				uploadedData.push({
// 					fileUrl: `https://storage.googleapis.com/mediaa/${site}/${folder}/${fileUpload.name.split("/").pop()}`,
// 					fileSize: size,
// 					fileName: fileUpload.name.split("/").pop(),
// 				});

// 				const stream = await fileUpload.createWriteStream({
// 					metadata: {
// 						contentType: `image/${extension}`,
// 					},
// 				});

// 				await stream.end(imageData);

// 				await new Promise((resolve, reject) => {
// 					stream.on("finish", resolve);
// 					stream.on("error", reject);
// 				});

// 				return { status: 200, message: "Files uploaded", data: uploadedData };
// 			} catch (error) {
// 				console.error(error.message);
// 				return { status: 400, message: error.message, data: 0 };
// 			}
// 		});
// 	} catch (error) {
// 		console.log(error.message);
// 		return { status: 500, message: error.message, data: 0 };
// 	}
// };
