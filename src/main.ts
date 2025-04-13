import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import {
  provideMonacoEditor,
  NgxMonacoEditorConfig,
} from 'ngx-monaco-editor-v2';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    provideMonacoEditor({
      baseUrl: 'assets/monaco',
      defaultOptions: {
        scrollBeyondLastLine: false,
      },
    } as NgxMonacoEditorConfig),
  ],
}).catch((err) => console.error(err));
