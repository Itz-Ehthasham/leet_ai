export function extractLeetCodeProblem() {
  const titleElement = document.querySelector('[data-cy="question-title"]') || 
                       document.querySelector('.text-title-large');
  const descriptionElement = document.querySelector('[data-track-load="description_content"]') ||
                             document.querySelector('.elfjS');
  
  const title = titleElement?.textContent?.trim() || 'Unknown Problem';
  const description = descriptionElement?.textContent?.trim() || '';

  return {
    title,
    description,
    url: window.location.href,
  };
}

export function extractUserCode() {
  const codeEditor = document.querySelector('.monaco-editor') as HTMLElement;
  
  if (codeEditor) {
    const lines = codeEditor.querySelectorAll('.view-line');
    const code = Array.from(lines)
      .map(line => line.textContent)
      .join('\n');
    return code;
  }
  
  return '';
}
