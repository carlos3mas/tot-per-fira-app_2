# Integración de Google Reviews - Guía de Despliegue

## 📋 Resumen
Las reseñas de Google se obtienen automáticamente desde Google Places API y se actualizan cada hora mediante caché de Next.js.

## 🔧 Configuración para Producción

### 1. Variables de Entorno Requeridas

Agrega estas variables en tu plataforma de hosting (Vercel, Netlify, etc.):

```bash
GOOGLE_PLACES_API_KEY=tu_api_key_aqui
GOOGLE_PLACE_ID=tu_place_id_aqui
```

### 2. Seguridad de la API Key (IMPORTANTE)

⚠️ **Antes de desplegar a producción:**

1. Ve a [Google Cloud Console - Credentials](https://console.cloud.google.com/apis/credentials)
2. Selecciona tu API Key
3. Configura las restricciones:
   - **Restricción de aplicación**: Sitios web
   - **Restricciones de sitios web**: Agrega tu dominio de producción (ej: `https://tu-dominio.com/*`)
   - **Restricción de API**: Limita solo a "Places API"

### 3. Cómo Funciona

- **Server Component**: El componente `Testimonials` es un Server Component que obtiene las reseñas en el servidor
- **Caché**: Las reseñas se cachean por 1 hora (`revalidate: 3600`)
- **Fallback**: Si la API falla, se muestran reseñas de respaldo predefinidas
- **Actualización**: Las reseñas se actualizan automáticamente cada hora

### 4. Límites de la API

Google Places API tiene límites gratuitos:
- **Gratuito**: Hasta $200 USD/mes en créditos
- **Place Details**: ~$17 por cada 1,000 requests
- Con caché de 1 hora: ~720 requests/mes = ~$12/mes

### 5. Verificación Local

Para probar localmente:

```bash
# 1. Copia el archivo de ejemplo
cp .env.example .env.local

# 2. Agrega tus credenciales en .env.local
GOOGLE_PLACES_API_KEY=tu_api_key
GOOGLE_PLACE_ID=tu_place_id

# 3. Reinicia el servidor
pnpm dev:web
```

### 6. Monitoreo

Revisa los logs de tu aplicación para:
- Errores de API: `Google API error`
- Uso de fallback: `using fallback reviews`
- Credenciales faltantes: `credentials not found`

## 🚀 Checklist de Despliegue

- [ ] Variables de entorno configuradas en el hosting
- [ ] API Key restringida a tu dominio de producción
- [ ] API Key limitada solo a Places API
- [ ] Verificado que `.env.local` está en `.gitignore`
- [ ] Probado localmente con las credenciales reales
- [ ] Revisado los logs después del despliegue

## 📝 Notas Adicionales

- Las reseñas se obtienen en español (`language=es`)
- Se muestran máximo las últimas 5 reseñas (límite de Google)
- El componente es completamente automático, no requiere mantenimiento
