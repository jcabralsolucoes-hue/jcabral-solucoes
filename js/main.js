document.addEventListener('DOMContentLoaded', function () {
  const btns = document.querySelectorAll('.btn-servico');
  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const modalId = btn.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'flex';
    });
  });

  const closes = document.querySelectorAll('.close');
  closes.forEach(close => {
    close.addEventListener('click', function () {
      const modalId = close.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'none';
    });
  });

  // Fecha modal ao clicar fora
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  });

  // Contato - validação e envio Formspree
  const contatoForm = document.getElementById('contato-form');
  if (contatoForm) {
    contatoForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const nome = contatoForm.nome.value.trim();
      const email = contatoForm.email.value.trim();
      const telefone = contatoForm.telefone.value.trim();
      const mensagem = contatoForm.mensagem.value.trim();
      const status = document.getElementById('form-status');

      if (!nome || !email || !telefone || !mensagem) {
        status.textContent = "Preencha todos os campos.";
        status.style.color = "red";
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Email inválido.";
        status.style.color = "red";
        return;
      }

      status.textContent = "Enviando...";
      status.style.color = "var(--azul)";

      const data = new FormData(contatoForm);
      try {
        const resp = await fetch(contatoForm.action, {
          method: "POST",
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
          status.textContent = "Mensagem enviada! Retornaremos em breve.";
          status.style.color = "green";
          contatoForm.reset();
        } else {
          status.textContent = "Erro ao enviar. Tente novamente.";
          status.style.color = "red";
        }
      } catch {
        status.textContent = "Erro de conexão. Tente novamente.";
        status.style.color = "red";
      }
    });
  }
});
