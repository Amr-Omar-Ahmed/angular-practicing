import { Component } from '@angular/core';

@Component({
  selector: 'app-server-home-page',
  templateUrl: './server-home-page.component.html',
  styleUrls: ['./server-home-page.component.css']
})
export class ServerHomePageComponent {
  serverElements = [{ type: 'server', name: 'Testserver', content: 'Just a test!' }];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }

}
