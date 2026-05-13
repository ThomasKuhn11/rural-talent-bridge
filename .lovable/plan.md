## Trocar Work Sans por Inter

Substituir a fonte principal **Work Sans** pela **Inter** em todo o projeto, mantendo **Lora** (serifa) e **Inconsolata** (mono) intactas.

### Arquivos alterados

**1. `src/index.css`**
- Trocar o `@import` do Google Fonts de Work Sans para Inter (pesos 400, 500, 600, 700).
- Atualizar a variável `--font-sans` para começar com `'Inter'` em vez de `'Work Sans'`.

**2. `tailwind.config.ts`**
- No `fontFamily.sans`, trocar `'Work Sans'` por `'Inter'` como primeira fonte da pilha.
- Manter `serif` (Lora) e `mono` (Inconsolata) inalterados.

### Resultado
Todo texto que usa a fonte padrão (`font-sans` / body) passa a renderizar em Inter, dando a aparência limpa estilo Supabase. Componentes que explicitamente usam `font-serif` ou `font-mono` continuam com Lora e Inconsolata.