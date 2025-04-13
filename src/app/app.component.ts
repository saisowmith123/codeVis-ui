import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
// import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    // HttpClientModule,
    // BrowserAnimationsModule,
    MonacoEditorModule,
    // ToastrModule,
    CodeEditorComponent,
    LanguageSelectorComponent,
    VisualizationComponent,
  ],
})
export class AppComponent implements OnInit {
  language: string = 'python';
  code: string = '';
  loading: boolean = false;
  visualization: any = null;

  constructor(
    private apiService: ApiService,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCode();
  }

  loadCode() {
    this.code = this.localStorageService.getSavedCode(this.language);
  }

  handleLanguageChange(lang: string) {
    this.language = lang;
    this.loadCode();
  }

  handleCodeChange(updatedCode: string) {
    this.code = updatedCode;
    this.localStorageService.saveCode(this.language, updatedCode);
  }

  async handleGenerateVisualization() {
    if (!this.code.trim()) {
      this.toastr.error(
        'Please enter some code before generating a visualization.'
      );
      return;
    }

    this.loading = true;
    try {
      const result = await this.apiService.generateVisualization(
        this.language,
        this.code
      );
      this.visualization = result;
      this.toastr.success('Visualization generated successfully!');
    } catch (error: any) {
      const message =
        error?.error?.detail || 'Failed to generate visualization.';
      this.toastr.error(message);
      console.error('Visualization Error:', error);
    } finally {
      this.loading = false;
    }
  }
}
