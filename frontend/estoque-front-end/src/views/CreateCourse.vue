<script setup>
import { reactive, ref } from 'vue'

const enviando = ref(false)
const sucesso = ref('')
const erro = ref('')

const curso = reactive({
  name: '',
  category: '',
  professor: '',
  active: true,
})

const payloadExemplo = `{
  "name": "Angular",
  "category": "Frontend",
  "active": true,
  "professor": "Ciclano"
}`

function limparFormulario() {
  curso.name = ''
  curso.category = ''
  curso.professor = ''
  curso.active = true
}

async function criarCurso() {
  enviando.value = true
  sucesso.value = ''
  erro.value = ''

  try {
    const resposta = await fetch('/curso/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(curso),
    })

    if (!resposta.ok) {
      const mensagem = await resposta.text()
      throw new Error(mensagem || 'Nao foi possivel criar o curso.')
    }

    sucesso.value = 'Curso criado com sucesso.'
    limparFormulario()
  } catch (error) {
    erro.value = error instanceof Error ? error.message : 'Erro inesperado ao criar o curso.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <main class="page">
    <section class="page-header">
      <div>
        <p class="eyebrow">Novo curso</p>
        <h1>Criar curso</h1>
        <p class="subtitle">Preencha o formulario e envie os dados para a API.</p>
      </div>

      <RouterLink class="back-link" to="/home">Voltar para a lista</RouterLink>
    </section>

    <section class="layout">
      <form class="card form-card" @submit.prevent="criarCurso">
        <div class="field-grid">
          <label>
            <span>Nome</span>
            <input v-model.trim="curso.name" type="text" placeholder="Ex.: Angular" required />
          </label>

          <label>
            <span>Categoria</span>
            <input v-model.trim="curso.category" type="text" placeholder="Ex.: Frontend" />
          </label>

          <label>
            <span>Professor</span>
            <input v-model.trim="curso.professor" type="text" placeholder="Ex.: Ciclano" required />
          </label>

          <label class="checkbox-row">
            <input v-model="curso.active" type="checkbox" />
            <span>Curso ativo</span>
          </label>
        </div>

        <div class="feedback-group">
          <p v-if="sucesso" class="success">{{ sucesso }}</p>
          <p v-if="erro" class="error">{{ erro }}</p>
        </div>

        <div class="actions">
          <button type="submit" :disabled="enviando">
            {{ enviando ? 'Salvando...' : 'Criar curso' }}
          </button>
          <button type="button" class="ghost" @click="limparFormulario">Limpar</button>
        </div>
      </form>

      <aside class="card example-card">
        <h2>Payload esperado</h2>
        <p>Esse e o formato que o backend recebe em <strong>/curso/create</strong>.</p>

        <pre>{{ payloadExemplo }}</pre>

        <div class="meta-list">
          <span>POST /curso/create</span>
          <span>Persistencia no PostgreSQL</span>
          <span>Campo active opcional</span>
        </div>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.eyebrow {
  margin: 0 0 6px;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5c6b80;
}

h1,
h2 {
  margin: 0;
  color: #1e293b;
}

.subtitle {
  margin: 6px 0 0;
  color: #5b6577;
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.8fr);
  gap: 20px;
}

.card {
  border: 1px solid #e3e3e3;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.form-card {
  padding: 24px;
}

.field-grid {
  display: grid;
  gap: 16px;
}

label {
  display: grid;
  gap: 8px;
}

label span {
  font-weight: 600;
  color: #334155;
}

input[type='text'] {
  width: 100%;
  border: 1px solid #d6dde7;
  border-radius: 10px;
  padding: 12px 14px;
  background: #fff;
}

input[type='text']:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
}

.checkbox-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.checkbox-row input {
  width: 18px;
  height: 18px;
}

.feedback-group {
  min-height: 28px;
  margin: 16px 0 4px;
}

.success,
.error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 10px;
}

.success {
  background: #ecfdf3;
  color: #166534;
}

.error {
  background: #fef2f2;
  color: #b91c1c;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

button,
.back-link {
  border-radius: 10px;
  padding: 12px 16px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
}

button[type='submit'] {
  background: #1d4ed8;
  color: #fff;
}

button.ghost {
  background: #fff;
  border-color: #d6dde7;
  color: #1f2937;
}

.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-color: #d6dde7;
  color: #1f2937;
  background: #fff;
}

.example-card {
  padding: 24px;
  display: grid;
  gap: 14px;
}

.example-card p {
  margin: 0;
  color: #5b6577;
}

pre {
  margin: 0;
  padding: 16px;
  border-radius: 14px;
  background: #0f172a;
  color: #e2e8f0;
  overflow-x: auto;
}

.meta-list {
  display: grid;
  gap: 8px;
}

.meta-list span {
  padding: 10px 12px;
  border-radius: 10px;
  background: #f8fafc;
  color: #334155;
}

@media (max-width: 960px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>