# Gemini Enterprise Eval Studio (Edición LATAM — `ge-eval-spla`)

<div align="center">
  <img src="src/assets/logo.svg" alt="Gemini Enterprise Eval Studio Lockup" />
</div>

> **Soporte multilingüe (ES-LATAM / PT-BR / EN):** Esta edición está basada en [GoogleCloudPlatform/gemini-enterprise-eval-studio](https://github.com/GoogleCloudPlatform/gemini-enterprise-eval-studio) e incorpora internacionalización ligera en tiempo de ejecución con **Español Latinoamericano (`es`) por defecto**, además de **Portugués de Brasil (`pt-BR`)** e **Inglés (`en`)** seleccionables desde el encabezado superior.

## Descripción general

Gemini Enterprise Eval Studio es un framework de evaluación diseñado para ejecutar llamadas stateless a las APIs de Gemini Enterprise con el objetivo de realizar evaluaciones de extremo a extremo (E2E).
Permite a los equipos ejecutar evaluaciones por lotes, comparar resultados contra un *baseline*, medir métricas de latencia de streaming (`TTFT`, `TTFA`, `TTLT`, latencia de grounding y ejecución de herramientas) y definir métricas personalizadas mediante rúbricas de *Auto Rater* (LLM-as-a-Judge) o evaluadores programáticos.

## Motivación

El aseguramiento de calidad es uno de los principales retos al implementar Gemini Enterprise. Los clientes empresariales requieren herramientas seguras del lado del cliente para evaluar el desempeño, la precisión y la latencia del modelo sobre colecciones privadas sin depender de plataformas externas que comprometan sus políticas de privacidad de datos.

## Características principales

- **Ejecución stateless del lado del cliente**: Comunicación directa con las APIs usando tokens del usuario final, preservando la privacidad de los datos.
- **Interfaz multilingüe para LATAM**: Español Latinoamericano por defecto, con cambio instantáneo a Portugués (Brasil) e Inglés desde el selector del encabezado (persistido en `localStorage`), manteniendo compatibilidad 100% con los encabezados CSV estándar.
- **Evaluación de conversaciones multiturno**: Agrupa consultas mediante `conversation_id` (con números consecutivos en `turn` iniciando en `0` o `1`) para evaluar conversaciones multiturno conservando el contexto de sesión del asistente.
- **Telemetría de latencia**: Calcula y muestra en segundos (`s`):
  - **TTFT** (*Time to First Token* — Tiempo hasta el primer token)
  - **TTFA** (*Time To First Answer Token* — Tiempo hasta el primer token de respuesta)
  - **TTLT** (*Time To Last Token* — Tiempo hasta el último token)
- **Definición dual de métricas**: Soporte para rúbricas con *Auto Rater* (LLM-as-a-Judge) y evaluadores programáticos (LCS / ROUGE-L F1 y Source Attribution).

## Formato del dataset CSV

> **Importante:** Para mantener compatibilidad con datasets existentes, `Compare Evals` y el proyecto original, los **nombres de columnas CSV se mantienen en inglés** independientemente del idioma seleccionado en la interfaz.

Para **Ejecutar evaluación** (*Run Evaluation*), el CSV de entrada debe incluir las columnas `query` y `golden`. Para evaluar **conversaciones multiturno**, agrega `conversation_id` y `turn`:

| Columna | Obligatoria | Descripción |
| :--- | :---: | :--- |
| `query` | Sí | El *prompt* o consulta enviada al asistente. |
| `golden` | Sí | La respuesta ideal esperada usada como referencia por el evaluador. |
| `conversation_id` | No | Agrupa filas en una conversación multiturno compartiendo el mismo contexto de sesión. Las filas sin `conversation_id` se ejecutan como consultas independientes de un solo turno. |
| `turn` | No (Obligatoria si hay `conversation_id`) | Orden numérico consecutivo del turno dentro de un `conversation_id`, iniciando en `0` o `1` (ej. `1`, `2`, `3`). Si falta o no es consecutivo, las filas restantes de esa conversación se marcan como `INVALID_TURN_ID`. |
| `expected_sources` | No | Lista separada por `;` de fuentes esperadas para el evaluador *Source Attribution*. |
| `connectors_override` | No | IDs de conectores separados por `;`, `web_search` para búsqueda web, `[]` para ninguno, o vacío para heredar la configuración global. |

## Calificación (*Scoring*)

Cada fila evaluada sin error (`SKIPPED`, `FAILED`, `ERROR`, `INVALID_TURN_ID` o `SESSION_FAILED`) recibe un puntaje entre `0.0` y `1.0` según los métodos elegidos en **Configuración de evaluación (Scoring)**; las filas con error (o sin `golden` cuando el evaluador lo requiere) se omiten y dejan la celda en blanco. El método **Auto Rater (LLM-as-a-Judge)** solicita a un modelo Gemini que califique la respuesta obtenida frente a la respuesta `golden`:

| Parámetro | Descripción |
| :--- | :--- |
| **Ubicación del Auto Rater** | Ubicación de Vertex AI (`global`, `us`, `eu`). |
| **Modelo del Auto Rater** | El modelo Gemini que califica cada respuesta. |
| **Instrucciones del Auto Rater** | La rúbrica y escala de calificación que seguirá el modelo (mínimo 20 caracteres). Al cambiar de idioma en la UI, la rúbrica por defecto se adapta automáticamente si no ha sido modificada manualmente. |

Para agregar un evaluador personalizado, consulta [`src/app/scoring/README.md`](src/app/scoring/README.md).

## Selección de Agente

Por defecto, cada consulta se envía al asistente predeterminado del *engine* seleccionado. Para evaluar un agente personalizado, selecciónalo en el desplegable **Agente**, que lista los agentes publicados bajo ese *engine*. Los agentes suspendidos aparecen marcados como `(suspendido)` y solo sus propietarios (o administradores en edición Enterprise) pueden ejecutarlos.

- Todas las consultas de una ejecución se envían al mismo agente.
- La configuración queda bloqueada mientras una ejecución está en curso para garantizar consistencia entre filas.
- El CSV exportado incluye una columna `Agent ID` con el agente usado en cada fila (vacía si se usó el asistente predeterminado).

## Privacidad y gobierno de datos

1. **Aislamiento en tu tenant de GCP**: La herramienta opera completamente dentro de tu entorno de Google Cloud Platform (GCP).
2. **Sin recolección de datos por parte de Google**: Google no recopila, almacena ni accede a tus datos de cliente, consultas, entradas ni resultados de evaluación.
3. **Acuerdos vigentes**: Todo uso de APIs se rige únicamente por tus acuerdos vigentes de Google Cloud (por ejemplo, Vertex AI APIs).
4. **Política de retención de tokens y Firestore**:
   - **SAML**: Sin almacenamiento de credenciales ni refresh tokens en Firestore (las sesiones expiran tras 1 hora).
   - **Google Identity y 3P OIDC**: Si se habilita `firestore_config`, los refresh tokens se guardan en Firestore con TTL configurable (`firestore_config.ttlSeconds`, 7 días por defecto).
5. **Responsabilidad sobre los datos exportados**: Los archivos CSV descargados residen en tu equipo local fuera de GCP; debes resguardarlos y eliminarlos conforme a las políticas de tu organización.

## Prerrequisitos y configuración

Gemini Enterprise Eval Studio soporta dos modos de operación:

- **Modo Auth (Producción / Equipos)**: Los usuarios se autentican con Google Workspace (`google_identity`) o proveedores de identidad externos (`3p_oidc` / `3p_saml`) mediante Workforce Identity Federation (WIF).
- **Modo No-Auth (Cliente / Pruebas rápidas locales)**: La aplicación corre únicamente como frontend sin servidor backend. El usuario pega un token temporal de acceso de Google Cloud directamente en la UI.

### 1. APIs requeridas en GCP

En Google Cloud Console, ve a **APIs y servicios > Biblioteca** y habilita:
1. **Agent Platform API** (`agentplatform.googleapis.com`)
2. **Discovery Engine API** (`discoveryengine.googleapis.com`)

### 2. Configuración del Modo Auth

1. Configura tus credenciales de OAuth 2.0 (Google Workspace) o Workforce Identity Federation (OIDC/SAML) con URI de redirección `http://localhost:3000/auth/callback` (o tu dominio de producción).
2. Crea un archivo `config.json` en la raíz basado en [`config.json.example`](config.json.example).
3. *(Opcional)* Usa GCP Secret Manager para los secretos y `firestore_config` (Firestore en modo Native) para persistir refresh tokens.

### 3. Configuración del Modo No-Auth (Prueba local)

1. Obtén un token temporal de acceso de Google Cloud ejecutando en tu terminal (o en Cloud Shell):
   ```sh
   gcloud auth print-access-token
   ```
   *Nota: estos tokens son temporales y deberán renovarse periódicamente.*
2. Pega el token en el campo **Token de acceso de gcloud** en la pantalla de configuración de la aplicación.

## Ejecución local

Instala las dependencias:

```sh
npm ci
```

Luego inicia el servidor en el modo que prefieras:

- **Modo No-Auth (solo frontend, puerto `4200` — ideal para pruebas locales):**
  ```sh
  npm run start:no-auth
  # o simplemente: npm start
  ```

- **Modo Auth (full stack con backend Express en puerto `3000` + frontend Angular):**
  ```sh
  npm run start:auth
  ```

### Ejecutar pruebas automatizadas

```sh
# Todas las pruebas (frontend + servidor)
npm test

# Solo frontend
npm run test:frontend

# Solo servidor
npm run test:server
```

## Ejecución con Docker y Cloud Run

### 1. Construir la imagen
```sh
docker build -t gemini-enterprise-eval-studio .
```

### 2. Ejecutar el contenedor
```sh
docker run -d \
  -p 8080:8080 \
  -v $(pwd)/config.json:/app/config.json \
  --name eval-studio \
  gemini-enterprise-eval-studio
```

### 3. Desplegar en Cloud Run
```sh
gcloud run deploy gemini-enterprise-eval-studio \
  --project=<PROJECT_ID> \
  --region=<REGION> \
  --source=.
```

## Licencia y atribución

Licenciado bajo [Apache License 2.0](LICENSE). Basado en el proyecto original [GoogleCloudPlatform/gemini-enterprise-eval-studio](https://github.com/GoogleCloudPlatform/gemini-enterprise-eval-studio).
