const serverInput = document.getElementById('server');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');

chrome.storage.sync.get(['serverUrl', 'lastSync'], (data) => {
  if (data.serverUrl) serverInput.value = data.serverUrl;
});

saveBtn.addEventListener('click', async () => {
  const url = serverInput.value.trim().replace(/\/+$/, '');
  if (!url) { status.textContent = 'Enter a server URL'; status.style.color = '#b91c1c'; return; }

  await chrome.storage.sync.set({ serverUrl: url });
  status.textContent = 'Syncing...';
  status.style.color = '#9a9a9a';

  try {
    const response = await fetch(`${url}/api/cookies`);
    const data = await response.json();
    status.textContent = data.hasCookies ? 'Connected! Cookies synced.' : 'Connected! Waiting for cookies...';
    status.style.color = '#166534';
    chrome.runtime.sendMessage({ action: 'syncNow' });
  } catch {
    status.textContent = 'Cannot reach server';
    status.style.color = '#b91c1c';
  }
});
