# Sistema de Favoritos - Documentação

## Visão Geral
Um sistema completo de favoritos foi implementado, permitindo que usuários autenticados favoritarem corredores da F1. Os favoritos são persistidos no localStorage vinculados ao perfil do usuário.

## Arquivos Criados/Modificados

### 1. **Novo Serviço: `favorites.service.ts`**
- Gerencia favoritos dos usuários com RxJS Observables
- Funcionalidades principais:
  - `toggleFavorite()` - Adiciona ou remove favoritos
  - `isFavorite()` - Verifica se um corredor é favorito
  - `addFavorite()` / `removeFavorite()` - Gerenciam favoritos
  - Persistência em localStorage com chave `favorites_${email}`
  - Sincronização automática quando usuário faz login

### 2. **Modificado: `login.service.ts`**
- Integração com FavoritesService
- Novo método `logout()` - Limpa favoritos ao fazer logout
- Novo método `getCurrentUser()` - Retorna usuário atual
- Carrega favoritos ao fazer login: `setCurrentUser()`

### 3. **Modificado: `modal-drivers.component.ts`**
- Implementação do botão de estrela interativa
- Verifica se usuário está logado antes de permitir favoritar
- Atualiza status de favorito quando driver é selecionado
- Alerta ao usuário não logado: "Por favor, faça login para adicionar favoritos!"

### 4. **Modificado: `modal-drivers.component.html`**
- Adicionado botão de estrela na header do modal
- Ícone muda de aparência quando favoritado (99% de opacidade + fundo amarelo)

### 5. **Modificado: `modal-drivers.component.scss`**
- Estilos para botão de estrela (`.btn-star`)
- Estado favoritado: background amarelo com sombra
- Animações: hover com scale e transição suave

### 6. **Modificado: `app.component.ts`**
- Inicializa FavoritesService ao carregar a aplicação
- Carrega automaticamente favoritos salvos se usuário já estava logado

### 7. **Novo/Modificado: `favoritos.component.ts`, `.html`, `.scss`**
- Página dedicada para visualizar corredores favoritados
- Grid responsivo com cards dos corredores
- Botão para remover favoritos
- Mensagens especiais para:
  - Usuário não logado: "Você não está logado!"
  - Sem favoritos: "Sem favoritos ainda!"
- Exibição de informações do corredor (número, equipe, nacionalidade)

### 8. **Modificado: `header.component.ts`**
- Detecta status de login
- Exibe email do usuário quando logado
- Botão "Logout" com styling diferenciado
- Links "Login" e "Cadastro" apenas para não logados

### 9. **Modificado: `header.component.html`**
- Novo layout com "user-section"
- Link ⭐ Favoritos adicionado ao menu
- Seleção condicional: Login/Cadastro (não logado) vs Email/Logout (logado)

### 10. **Modificado: `header.component.scss`**
- `.user-section` - Container para informações do usuário
- `.user-email` - Estilo amarelo dourado
- `.logout-btn` - Estilo vermelho para logout

## Fluxo de Funcionamento

### Login
1. Usuário faz login no componente Login
2. `LoginService.login()` salva usuário em localStorage
3. `FavoritesService.setCurrentUser()` é chamado
4. Favoritos salvos anteriormente são carregados automaticamente

### Favoritar um Corredor
1. Modal abre com detalhes do corredor
2. Usuário clica na estrela
3. Se não autenticado: exibe alert
4. Se autenticado: `FavoritesService.toggleFavorite()` é chamado
5. Estrela muda aparência (amarela com glow)
6. Favorito é salvo em localStorage

### Visualizar Favoritos
1. Usuário navega para `/favoritos`
2. Grid responsivo exibe todos os corredores favoritados
3. Cada card exibe foto, número, equipe e nacionalidade
4. Botão "✕" remove o corredor dos favoritos

### Logout
1. Usuário clica em "Logout" no header
2. `LoginService.logout()` limpa localStorage
3. `FavoritesService.logout()` limpa lista de favoritos
4. Redirecionado para página de login

## Persistência de Dados

Os favoritos são armazenados com a seguinte estrutura:
```javascript
localStorage.setItem(`favorites_${userEmail}`, JSON.stringify([
  numero_corredor1,
  numero_corredor2,
  ...
]));
```

Cada usuário terá seus próprios favoritos isolados pelo email.

## Decisões de Design

1. **RxJS Observables** - Permite reatividade entre componentes
2. **localStorage** - Simples persistência vinculada ao navegador
3. **Email como chave** - Isolamento de favoritos por usuário
4. **Material Design** - Cards com animações suaves
5. **Validação de Login** - Requirem autenticação para favoritar

## Melhorias Futuras

- [ ] Integração com API backend
- [ ] Banco de dados para persistência permanente
- [ ] Sincronização em múltiplos dispositivos
- [ ] Histórico de favoritos
- [ ] Compartilhamento de favoritos
- [ ] Notificações quando favoritos disputam corridas
