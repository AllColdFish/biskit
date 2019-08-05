import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { CheckInService } from '../../services/check-in.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  ngVersion = VERSION.full;

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;

  private qrSource = new BehaviorSubject('');
  currentQR = this.qrSource.asObservable();

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  constructor(public cs: CheckInService) { }

  clearResult(): void {
    this.cs.qrResultString = '';
  }

  ngOnInit(): void {
      this.currentQR.subscribe(qr => this.cs.qrResultString = qr);
      this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
        this.availableDevices = devices;
        this._selectBackfaceCamera(devices);
      });
  }

  onCodeResult(resultString: string) {
    this.cs.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  private _selectBackfaceCamera(devices: MediaDeviceInfo[]) {
    // selects the devices's back camera by default
    for (const device of devices) {
      if (/back|rear|environment/gi.test(device.label)) {
        this.currentDevice = device;
        break;
      }
    }
  }

  changeMessage(message: string) {
    this.qrSource.next(message);
  }

}
