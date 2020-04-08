import fs from 'fs';
import request from 'request';

/** 
 * Downloads a file and places it under app/static/
 * Is used when populating app with random data
 */

export default function download(url: string,name: string) {
	return new Promise((resolve,reject) => {
		request(url,{ encoding: 'binary' },function(error: any,res: any,body: any) {

			if(error) return reject(error);

			const contentType = res.headers['content-type'];
			const extension = contentTypeToExtension[contentType];

			if(!extension) return reject('No extension found for content-type=' + contentType);

			const filename = 'public-assets/' + name + extension;

			fs.writeFile(filename,body,'binary',function(err) {
				if(err) return reject();

				resolve(name + extension);
			});
		});
	});
}


const contentTypeToExtension = {
	"image/gif": ".gif",
	"image/jpeg": ".jpeg",
	"image/png": ".png",
	"image/tiff": ".tiff",
	"image/vnd.wap.wbmp": ".wbmp",
	"image/webp": ".webp"
};