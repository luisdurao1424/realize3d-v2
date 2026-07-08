const AutoSave = (() => {
  const DEBOUNCE_MS = 800;

  let timer = null;
  let status = 'idle';
  let saving = false;
  let flushAgain = false;
  let unsubscribe = null;
  let saveCurrent = null;
  let hasWorkspace = () => false;

  function setStatus(nextStatus) {
    status = nextStatus;
  }

  function schedule() {
    setStatus('pending');
    console.log('AutoSave: pending');
    clearTimeout(timer);
    timer = setTimeout(() => {
      flush();
    }, DEBOUNCE_MS);
  }

  async function flush() {
    clearTimeout(timer);
    timer = null;

    if (!hasWorkspace() || typeof saveCurrent !== 'function') {
      setStatus('idle');
      return;
    }

    if (saving) {
      flushAgain = true;
      return;
    }

    saving = true;
    flushAgain = false;
    setStatus('saving');
    console.log('AutoSave: saving');

    try {
      await saveCurrent();
      setStatus('saved');
      console.log('AutoSave: saved');
    } catch (error) {
      setStatus('error');
      console.error('AutoSave: error', error);
    } finally {
      saving = false;
      if (flushAgain) {
        schedule();
      }
    }
  }

  function init(options = {}) {
    saveCurrent = options.save || saveCurrent;
    hasWorkspace = options.hasWorkspace || hasWorkspace;

    if (unsubscribe) {
      unsubscribe();
    }

    if (window.Store && typeof window.Store.subscribe === 'function') {
      unsubscribe = window.Store.subscribe(schedule);
    }
  }

  return { init, schedule, flush, setStatus };
})();

window.AutoSave = AutoSave;

export { AutoSave };
