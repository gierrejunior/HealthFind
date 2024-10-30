### 1. Objetivo do Sistema

O sistema tem como objetivo oferecer um serviço digital inovador e transparente para prefeituras, facilitando o planejamento e a gestão centralizada das áreas de abrangência de unidades de saúde municipais. Por meio dessa plataforma, as prefeituras poderão cadastrar, visualizar e atualizar informações de postos de saúde, equipes profissionais e suas respectivas áreas de atendimento de forma precisa e restrita ao limite municipal.

#### Benefícios para a Prefeitura:
- **Gestão Eficiente e Centralizada**: Centralização dos dados de saúde, como localização de postos, áreas de atendimento e profissionais, permitindo um acompanhamento atualizado e organizado.
- **Limitação Geográfica Automatizada**: Garantia de que todos os cadastros respeitem o limite territorial do município, evitando registros incorretos e assegurando que os serviços se mantenham dentro dos limites municipais.
- **Facilidade de Integração de Dados Geográficos**: Possibilidade de importar arquivos KML e converter para GeoJSON, simplificando o mapeamento de áreas e a definição de microáreas de atendimento para cada agente de saúde.
- **Transparência e Auditoria**: Registro completo de todas as alterações realizadas no sistema, promovendo um histórico detalhado de quem criou, atualizou ou excluiu dados, reforçando a transparência e a confiança nas informações geridas.

#### Benefícios para a População:
- **Transparência no Acesso à Saúde**: Acesso público e fácil às informações dos postos de saúde e equipes de atendimento responsáveis pela sua região, facilitando o entendimento de quais profissionais e serviços estão disponíveis.
- **Informações Atualizadas e Geolocalizadas**: Visualização da localização dos postos de saúde, áreas de abrangência e profissionais responsáveis diretamente no mapa, com base na localização do usuário.
- **Acesso Rápido e Responsivo**: Interface pública e intuitiva, permitindo que a população consulte os serviços e profissionais de saúde pelo computador ou dispositivo móvel, melhorando a conexão entre cidadãos e o sistema de saúde municipal.


---


### 2. Requisitos Funcionais

#### 2.1 Gestão de Usuários
   - **Administração de Usuários Autenticados**:
     - **Admin**:
       - Gerenciado pelos proprietários da aplicação, o Admin possui acesso completo ao sistema.
       - Capacidade de adicionar, configurar e remover prefeituras no sistema.
       - Definição e gestão dos **limites municipais** para cada prefeitura, garantindo que os dados cadastrados respeitem o território municipal.
       - Gerenciamento de permissões e níveis de acesso para usuários vinculados às prefeituras.
     - **Staff e User**:
       - Usuários operacionais das prefeituras, responsáveis pelo cadastro e gestão dos dados de saúde.
       - **Staff**: acesso avançado para gerenciamento de unidades de saúde e equipes dentro dos limites municipais.
       - **User**: acesso para cadastro e atualização de dados específicos, como a inserção de profissionais e microáreas, com permissões restritas ao seu município.
  
   - **Usuário Público (Não Autenticado)**:
     - Acesso aberto para visualização de informações de saúde municipais.
     - Permissões incluem:
       - **Visualização do posto de saúde responsável** pela área de residência do usuário.
       - **Informações sobre a equipe de saúde** da região, incluindo os profissionais de saúde, como:
         - Agente Comunitário de Saúde (ACS).
         - Enfermeiro.
         - Médico.
         - Dentista.
         - Técnico de Enfermagem.
       - **Exibição de Contatos e Horários de Funcionamento** do posto de saúde responsável pela região do usuário.

#### 2.2 Gestão de Unidades de Saúde
   - **Cadastro de Postos de Saúde**:
     - Informações detalhadas sobre o posto, incluindo título, descrição, endereço, contato, localização geográfica e imagem representativa.
     - **Vinculação de Equipes de Saúde**: associação de equipes específicas a cada posto, permitindo que cada unidade de saúde tenha sua equipe dedicada de profissionais.
     - **Limitação Geográfica Municipal**:
       - As prefeituras podem cadastrar unidades de saúde e suas respectivas áreas de abrangência, garantindo que a cobertura se mantenha dentro dos limites do município.
       - Permissão para importar dados de áreas de abrangência diretamente de arquivos KML, que serão convertidos para GeoJSON.
  
   - **Áreas de Abrangência do Posto de Saúde**:
     - **Geolocalização das Áreas de Atendimento**: definição visual das regiões cobertas por cada posto de saúde no mapa.
     - **Definição de Limites Municipais**: as áreas abrangidas por cada unidade de saúde não poderão ultrapassar as fronteiras do município, preservando a consistência e precisão dos dados.

#### 2.3 Gestão de Equipes e Profissionais
   - **Cadastro de Equipes de Saúde**:
     - Identificação de equipes vinculadas a cada unidade de saúde com informações de nome, descrição e área de abrangência.
     - Vinculação com profissionais de saúde, incluindo ACS, enfermeiros, médicos, dentistas e técnicos de enfermagem.
     - **Definição de Área de Abrangência da Equipe**:
       - Delimitação das microáreas de atuação da equipe, garantindo que cada equipe tenha uma área de cobertura clara e definida.
  
   - **Cadastro de Profissionais de Saúde**:
     - Detalhamento de cada profissional, incluindo nome, especialidade, contato e vínculo com a unidade de saúde e equipe.
     - Cada profissional é vinculado a uma **área de atuação** específica, definida dentro dos limites municipais.
     - Especialidades e funções previstas:
       - Agente Comunitário de Saúde (ACS) - responsável por áreas específicas (microáreas).
       - Enfermeiro.
       - Médico.
       - Dentista.
       - Técnico de Enfermagem.

#### 2.4 Áreas e Microáreas
   - **Área de Abrangência da Equipe**:
     - Suporte para importação de arquivos KML contendo os limites das áreas de abrangência da equipe, que são automaticamente convertidos em formato GeoJSON para visualização no sistema.
     - **Definição de Limites Geográficos**: cada equipe tem sua área de cobertura delimitada para garantir que a atuação não ultrapasse os limites municipais.
  
   - **Microáreas de Cobertura (ACS)**:
     - **Definição das Microáreas**: cada agente comunitário de saúde (ACS) é responsável por uma microárea específica dentro do município.
     - **Visualização Geográfica Precisa**: a microárea, que representa a área exata de cobertura do ACS, é exibida no mapa e vinculada diretamente ao ACS.
     - **Restrições Municipais**: todas as microáreas devem respeitar os limites do município e são delimitadas no sistema para garantir cobertura completa e consistente.

#### 2.5 Funcionalidades de Auditoria
   - **Registro de Logs de Auditoria**:
     - Histórico completo de todas as ações de criação, atualização e exclusão de registros no sistema, com data e hora das operações.
     - Detalhamento de registros, incluindo:
       - Identificação do usuário responsável pela ação.
       - Tipo de ação realizada (criação, atualização, exclusão).
       - Dados anteriores e novos para cada alteração realizada.
     - **Monitoramento de Ações**: cada ação realizada por usuários Staff e User é auditada, criando uma trilha de auditoria acessível para os administradores.


---

### 3. Requisitos Não-Funcionais

#### 3.1 Segurança
   - **Autenticação e Autorização**:
     - Utilização de autenticação JWT para garantir o acesso seguro e autenticado à aplicação.
     - Controle de permissões granular usando CASL, assegurando que as prefeituras e seus usuários (Staff e User) só tenham acesso aos dados de suas áreas geográficas e estejam restritos aos limites municipais.
   - **Proteção de Dados**:
     - Armazenamento seguro de dados sensíveis, como senhas e tokens de autenticação, utilizando criptografia e práticas recomendadas de segurança.
     - Monitoramento de logs e auditorias para rastreamento e prevenção de ações mal-intencionadas.
   - **Conformidade**:
     - Implementação de práticas e políticas de segurança que estejam em conformidade com regulamentações locais e nacionais, incluindo o respeito à privacidade dos dados dos cidadãos.

#### 3.2 Escalabilidade e Performance
   - **Escalabilidade**:
     - Arquitetura modular e baseada em serviços, facilitando a adição de novos módulos ou funcionalidades conforme a demanda.
     - Configuração para suportar picos de acessos e grandes volumes de dados, especialmente nas áreas de geolocalização e dados de auditoria.
     - Deploy em infraestrutura de nuvem via AWS, com autoscaling e alta disponibilidade para responder a demandas crescentes e garantir a estabilidade.
   - **Performance**:
     - Otimização de consultas ao banco de dados e estruturação eficiente para evitar latência e garantir tempos de resposta ágeis, mesmo com grandes volumes de dados.
     - Implementação de caching em pontos críticos para melhorar o desempenho nas consultas frequentes, como dados públicos de unidades de saúde e áreas de abrangência.
   - **Métricas e Monitoramento**:
     - Ferramentas de monitoramento e métricas para rastrear a performance da aplicação e ajustar a infraestrutura conforme necessário.
     - Log de erros e tempo de resposta para garantir manutenção proativa e reduzir interrupções de serviço.

#### 3.3 Experiência do Usuário
   - **Interface Responsiva e Intuitiva**:
     - Design responsivo e adaptado para dispositivos móveis e desktops, com uma interface intuitiva que facilita o uso por diferentes perfis de usuários (admin, staff, user, público).
     - Navegação simplificada para o usuário público, possibilitando a consulta rápida das informações de saúde por localização.
   - **Usabilidade para Usuários das Prefeituras**:
     - Ferramentas e fluxos de trabalho otimizados para cadastro e gerenciamento de dados, garantindo que o sistema seja fácil de usar, especialmente para os usuários operacionais das prefeituras.
     - Permissões e visibilidade de dados claras e baseadas em função, evitando confusões e erros no gerenciamento de informações sensíveis.


---


### 4. Funcionalidades de Acesso Público (Usuário Não Autenticado)

#### 4.1 **Visualização Pública Intuitiva e Simplificada**
   - **Interface de Fácil Acesso**:
     - Uma interface pública intuitiva e limpa, projetada para permitir que cidadãos consultem facilmente as informações de saúde relacionadas à sua área de residência.
     - Exibição clara das informações, com navegação simplificada para ajudar usuários de todas as idades e níveis de familiaridade com tecnologia.
   - **Informações Essenciais do Posto de Saúde**:
     - Dados básicos sobre o posto de saúde responsável pela área do usuário, incluindo **nome, endereço, telefone, e horário de atendimento**.
     - Mapa com **localização visual do posto de saúde**, facilitando a visualização da área de cobertura e a identificação do local mais próximo para atendimento.

#### 4.2 **Busca e Localização Georreferenciada**
   - **Localização Automática Baseada em Endereço ou Geolocalização do Dispositivo**:
     - O usuário pode optar por inserir seu endereço manualmente ou utilizar a localização automática do dispositivo para identificar rapidamente o posto de saúde e a equipe responsável pela sua residência.

   - **Mapas Interativos com Áreas de Abrangência**:
     - Visualização das áreas de abrangência de cada posto de saúde, incluindo os limites de cobertura das equipes e microáreas para agentes comunitários de saúde (ACS).
     - Exibição de camadas de informações detalhadas, permitindo ao usuário ver claramente os **limites das áreas de atuação dos profissionais** de saúde em sua região.

#### 4.3 **Exibição Detalhada dos Profissionais Responsáveis pela Área**
   - **Perfil dos Profissionais de Saúde Associados ao Posto**:
     - Visualização de informações sobre cada profissional responsável pela área, incluindo:
       - **Agente Comunitário de Saúde (ACS)** responsável pela microárea onde reside o usuário.
       - **Enfermeiro e Técnico de Enfermagem** da equipe, com dados de contato e especialidades, para cuidados de enfermagem gerais e especializados.
       - **Médico responsável** pela área, disponibilizando o contato e área de especialização para atendimentos clínicos.
       - **Dentista responsável pelo atendimento odontológico**, com dados de especialidade e horários de atendimento, facilitando o acesso à saúde bucal.
   

#### 4.4 **Benefícios e Transparência para a Comunidade**
   - **Acesso Transparente às Informações de Saúde Pública**:
     - Promove a transparência no acesso aos serviços de saúde, permitindo que os cidadãos identifiquem facilmente os profissionais e postos responsáveis por sua área.
     - Reduz dúvidas e facilita o acesso a cuidados de saúde, criando uma experiência confiável e acessível para a população.
   - **Facilidade de Navegação em Dispositivos Móveis e Desktop**:
     - Interface responsiva para dispositivos móveis e desktop, garantindo acesso a qualquer momento e em qualquer lugar, com uma experiência otimizada de visualização de mapa e dados.
     - Capacita a população com informações rápidas e precisas, promovendo maior participação e compreensão sobre os serviços de saúde disponíveis.

---

### 5. Especificações Técnicas Adicionais

#### 5.1 **Importação e Conversão de Arquivos**
   - **Suporte para Arquivos KML**:
     - Importação de arquivos KML para definição precisa das áreas de abrangência dentro dos limites municipais.
     - **Conversão Automática para GeoJSON** para assegurar compatibilidade com visualizações geográficas e mapas interativos no sistema.
   - **Validação e Restrição de Limites Municipais**:
     - Validação automática durante o cadastro e atualização de unidades e áreas de saúde para garantir que essas áreas respeitem os limites do município associado à prefeitura.
     - Notificação em caso de tentativa de cadastrar informações fora dos limites municipais, mantendo a integridade dos dados geográficos.

#### 5.2 **APIs e Controle de Acesso**
   - **Documentação com OpenAPI (Swagger)**:
     - **Integração com Swagger** para expor documentação completa das rotas da API, parâmetros, respostas e permissões, facilitando o entendimento técnico e a utilização pelos desenvolvedores da prefeitura.
     - Documentação acessível para a **API Pública e Privada**, garantindo transparência e padronização no uso dos endpoints e nos retornos esperados.
   - **API Privada para Usuários Autenticados (Admin, Staff, User)**:
     - **Autenticação e Autorização via JWT e CASL**:
       - Implementação de autenticação por JWT (JSON Web Token) para gerenciar o acesso dos usuários autenticados (Admin, Staff e User).
       - Controle de acesso baseado em CASL (Code Access Security Layer), definindo permissões específicas para cada nível de usuário, incluindo as seguintes regras:
         - **Admin**: acesso completo, incluindo gestão de prefeituras, limites municipais e dados gerais do sistema.
         - **Staff e User (Prefeituras)**: acesso limitado para criação, edição e visualização de informações apenas dentro do município ao qual estão vinculados.
   - **API Pública para Usuários Não Autenticados**:
     - Acesso aberto e restrito para usuários não autenticados, permitindo visualização de dados públicos (posto de saúde, equipe de saúde responsável e áreas de abrangência).
     - Limitação de acesso aos dados essenciais e exibidos de forma anônima para garantir a privacidade dos dados sensíveis.

#### 5.3 **Mapas e Geolocalização com OpenStreetMap (OSM)**
   - **Visualização e Interação Geográfica**:
     - **Integração com OpenStreetMap (OSM)** para fornecer mapas interativos e detalhados dentro do sistema, facilitando a visualização das áreas de cobertura de saúde e microáreas específicas.
     - Capacidade de **exibir mapas responsivos** com pontos de interesse relevantes, como unidades de saúde, áreas abrangentes e profissionais associados, acessíveis tanto na **interface pública quanto na privada**.
   - **Uso de Camadas Customizáveis**:
     - Adição de camadas personalizáveis que exibem dados específicos de saúde pública e demarcações de áreas, permitindo uma **visualização clara das áreas de abrangência de cada equipe e ACS**.
   - **Apoio ao Público Geral e Usuários das Prefeituras**:
     - OSM permite que o público geral identifique **automaticamente o posto de saúde, ACS, enfermeiro, médico, dentista e técnico de enfermagem** responsáveis pela área de residência, usando a localização atual do dispositivo ou endereço manualmente fornecido.
     - Facilita que as prefeituras visualizem e editem áreas no mapa com precisão, respeitando os limites municipais.

#### 5.4 **Segurança e Controle de Acesso**
   - **Autenticação JWT e Permissões CASL**:
     - JWT gerado para autenticação e autorização do usuário em cada sessão, assegurando que apenas usuários válidos possam acessar áreas restritas da API.
     - CASL configurado para garantir permissões precisas para cada tipo de usuário, impedindo o acesso ou modificação de dados por usuários não autorizados.
   - **Segregação de Dados por Município**:
     - Regras de CASL garantem que prefeituras e usuários não possam visualizar ou manipular dados de municípios aos quais não pertencem, assegurando a integridade e segurança dos dados municipais.

#### 5.5 **Modularidade e Reutilização**
   - **Arquitetura Modular para Extensibilidade**:
     - Divisão de módulos de funcionalidades, incluindo módulos específicos para **Usuários, Unidades de Saúde, Equipes de Saúde, Áreas e Auditoria**.
     - Estrutura modular facilita a extensão e a manutenção de novas funcionalidades ou adaptações do sistema para novos municípios ou regiões, preservando a integridade do sistema.
   - **Facilidade de Reutilização e Escalabilidade**:
     - A modularidade permite a fácil reutilização de componentes e a escalabilidade da aplicação, facilitando adaptações futuras.
     - Configuração de ambientes de desenvolvimento, teste e produção na AWS para suportar crescimento, com foco em alta disponibilidade e performance.

---

