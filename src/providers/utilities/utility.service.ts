import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  loading: HTMLIonLoadingElement = null;
  loaderMessage: string;
  alertPresent = false;
  loaderPresent = false;

  constructor(
    public loader: LoadingController,
    public modalController: ModalController
  ) { }

  private myLoader(message?): Promise<HTMLIonLoadingElement> {
    const loader = this.loader.create({
      spinner: "crescent",
      message: message,
      translucent: true,
      cssClass: "custom-loading",
    });
    return loader;
  }

  async showLoader(message?): Promise<void> {
    message = message ? message : "Please wait...";
    if (!this.loaderPresent) {
      this.loading = await this.myLoader(message);
      await this.loading.present();
      this.loaderPresent = true;
    }
  }
  hideLoaderFast(): void {
    this.loading.dismiss();
    this.loaderPresent = false;
  }

  hideLoader(): void {
    setTimeout(() => {
      if (this.loading) {
        this.loading.dismiss();
        this.loaderPresent = false;
      }
    }, 1500);
  }

  getLoader(): HTMLIonLoadingElement {
    if (this.loading) {
      return this.loading;
    }
  }
}
