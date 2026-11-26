const tickets = [
    { title: 'Проектор не включается', room: '203', category: 'Оборудование', done: false },
    { title: 'Не закрывается окно', room: '105', category: 'Аудитория', done: false },
    { title: 'В коридоре не горит свет', room: 'Коридор, 2-й этаж', category: 'Другое', done: true },
  ];
  
  const titleInput = document.getElementById('title');
  const roomInput = document.getElementById('room');
  const categorySelect = document.getElementById('category');
  const addBtn = document.getElementById('add-btn');
  const messageEl = document.getElementById('message');
  const listEl = document.getElementById('tickets-list');
  const onlyOpenCheckbox = document.getElementById('only-open');
  const filterCategorySelect = document.getElementById('filter-category');
  
  function showMessage(text, isSuccess = false) {
    messageEl.textContent = text;
    messageEl.classList.toggle('success', isSuccess);
  }
  
  function clearMessage() {
    messageEl.textContent = '';
    messageEl.classList.remove('success');
  }
  
  function renderTickets() {
    listEl.innerHTML = '';
  
    const onlyOpen = onlyOpenCheckbox.checked;
    const filterCategory = filterCategorySelect.value;
  
    if (tickets.length === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'Заявок пока нет';
      listEl.append(li);
      return;
    }
  
    let visibleCount = 0;
  
    for (let i = 0; i < tickets.length; i += 1) {
      const ticket = tickets[i];
  
      if (onlyOpen && ticket.done !== false) continue;
      if (filterCategory && ticket.category !== filterCategory) continue;
  
      visibleCount += 1;
  
      const li = document.createElement('li');
      li.className = 'ticket' + (ticket.done ? ' is-done' : '');
  
      const info = document.createElement('div');
      info.className = 'ticket__info';
  
      const titleEl = document.createElement('span');
      titleEl.className = 'ticket__title';
      titleEl.textContent = ticket.title;
  
      const metaEl = document.createElement('span');
      metaEl.className = 'ticket__meta';
      metaEl.textContent = 'Где: ' + ticket.room + ' · Категория: ' + ticket.category;
  
      const statusEl = document.createElement('span');
      statusEl.className = 'ticket__status';
      statusEl.textContent = ticket.done ? 'Выполнена' : 'Открыта';
  
      info.append(titleEl, metaEl, statusEl);
  
      const actions = document.createElement('div');
      actions.className = 'ticket__actions';
  
      if (!ticket.done) {
        const doneBtn = document.createElement('button');
        doneBtn.type = 'button';
        doneBtn.className = 'btn-done';
        doneBtn.textContent = 'Выполнить';
        doneBtn.addEventListener('click', () => {
          tickets[i].done = true;
          renderTickets();
        });
        actions.append(doneBtn);
      }
  
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'btn-delete';
      deleteBtn.textContent = 'Удалить';
      deleteBtn.addEventListener('click', () => {
        tickets.splice(i, 1);
        renderTickets();
      });
      actions.append(deleteBtn);
  
      li.append(info, actions);
      listEl.append(li);
    }
  
    if (visibleCount === 0) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = onlyOpen && !filterCategory
        ? 'Открытых заявок нет'
        : 'Нет заявок по выбранным фильтрам';
      listEl.append(li);
    }
  }
  
  addBtn.addEventListener('click', () => {
    clearMessage();
  
    const title = titleInput.value.trim();
    const room = roomInput.value.trim();
    const category = categorySelect.value;
  
    if (!title || !room || !category) {
      showMessage('Заполните все поля и выберите категорию.');
      return;
    }
  
    tickets.push({ title, room, category, done: false });
  
    onlyOpenCheckbox.checked = false;
    filterCategorySelect.value = '';
  
    titleInput.value = '';
    roomInput.value = '';
    categorySelect.value = '';
  
    renderTickets();
    showMessage('Заявка добавлена.', true);
  });
  
  onlyOpenCheckbox.addEventListener('change', renderTickets);
  filterCategorySelect.addEventListener('change', renderTickets);
  
  renderTickets();