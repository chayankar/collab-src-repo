import { NotifyLevels } from './../../constants/alert-level';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopupNotifyService {

  constructor(private toastr: ToastrService) { }

  showNotification(level: string, message: string, title?: string) {
    level = level.toUpperCase();
    title = title ? title : '';

    const htmlSnippet = '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>';
    const timeout = 1000;
    switch (level) {
      case NotifyLevels.info:
        this.toastr.info(htmlSnippet, title,
          {
            timeOut: timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-info alert-with-icon',
            positionClass: 'toast-top-center'
          }
        );
        break;
      case NotifyLevels.success:
        this.toastr.success(htmlSnippet, title,
          {
            timeOut: timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-center'
          }
        );
        break;
      case NotifyLevels.warning:
        this.toastr.warning(htmlSnippet, title,
          {
            timeOut: timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-warning alert-with-icon',
            positionClass: 'toast-top-center'
          }
        );
        break;
      case NotifyLevels.error:
        this.toastr.error(htmlSnippet, title,
          {
            timeOut: timeout,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-top-center'
          }
        );
        break;
      case NotifyLevels.show:
        this.toastr.show(htmlSnippet, title,
          {
            timeOut: timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-primary alert-with-icon',
            positionClass: 'toast-top-center'
          }
        );
        break;
      default:
        break;
    }
  }
}
