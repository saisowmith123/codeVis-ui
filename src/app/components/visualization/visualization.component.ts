import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css'],
})
export class VisualizationComponent {
  @Input() visualizationData: any;
  @Input() loading: boolean = false;

  get isImage(): boolean {
    return this.visualizationData?.url?.endsWith('.png');
  }
}
