import { Injectable } from '@angular/core';

const LOCAL_STORAGE_KEY = 'visucode_user_code';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getPlaceholderCode(language: string): string {
    if (language === 'python') {
      return `# Python visualization code example
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.show()`;
    }

    return `# R visualization code example
library(plotly)
plot_ly(x = ~c(1, 2, 3), y = ~c(4, 5, 6), type = 'scatter', mode = 'lines')`;
  }

  getSavedCode(language: string): string {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
    console.log(saved);
    return saved[language] || this.getPlaceholderCode(language);
  }

  saveCode(language: string, code: string): void {
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
    saved[language] = code;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(saved));
  }
}
