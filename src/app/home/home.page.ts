import { Component } from '@angular/core';

import { Api } from "../../providers";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private imgUrl = '';
  private dpNotFound = false;
  constructor(private api: Api, private fileTransfer: FileTransfer, private file: File) { }
  private fileTransferObj: FileTransferObject = this.fileTransfer.create();
  getProfilePicture(username) {
    return new Promise((resolve, reject) => {
      var params = {
        "__a": 1
      }
      this.api.get(username, params).subscribe((data) => {
        var res = JSON.parse(JSON.stringify(data));
        this.imgUrl = res["graphql"].user.profile_pic_url_hd;
        this.dpNotFound = false;
        resolve(res);
      },
        (error) => {
          this.dpNotFound = true;
          reject(error);
        }
      );
    });
  }

  downloadProfilePicture(username) {
    return new Promise((resolve, reject) => {
      var params = {
        "__a": 1
      }
      this.api.get(username, params).subscribe((data) => {
        var res = JSON.parse(JSON.stringify(data));
        this.imgUrl = res["graphql"].user.profile_pic_url_hd;
        this.dpNotFound = false;
        this.download(this.imgUrl, username);
        resolve(res);
      },
        (error) => {
          this.dpNotFound = true;
          reject(error);
        }
      );
    });
  }

  download(url, username) {
    const filename = 'IGDP_' + username;
    this.fileTransferObj.download(url, this.file.dataDirectory + filename + '.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
    });
  }
}
