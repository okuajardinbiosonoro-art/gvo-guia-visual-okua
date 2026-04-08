# Lía Andina — Spec cerrada

**Avatar:** Lía Andina (La Musa Biomimética)  
**Rol en GVO:** Entidad acompañante / mascota estilizada  
**Estado:** Biblia visual cerrada — lista para pipeline 3D  
**Última actualización:** 2026-04-08

---

## Identidad

Pequeña entidad de robótica blanda bioinspirada en la Flor de Inírida / orquídea.
No humanoide, no mascota animal. Flota, no camina. Compañera de aprendizaje
curiosa, delicada, amigable y grácil.

**Arquetipo:** La Entidad Acompañante (mascota estilizada).

**Relación arte/naturaleza/ciencia:** Un ser de robótica blanda (ciencia) cuyo
chasis imita la aerodinámica y belleza de la flor (naturaleza/arte).

---

## Anatomía

### Pétalos (5 con roles fijos, NO radial)

- **1 pétalo-corona superior:** vertical, apunta hacia arriba en el centro del
  eje. Forma alargada tipo lanza. Marfil cremoso con degradado a lavanda
  orquídea en la punta.
- **2 pétalos-ala laterales:** los más grandes y anchos. Se extienden
  horizontalmente hacia izquierda y derecha como alas grandes de orquídea.
  Marfil cremoso casi puro, apenas un toque de lavanda en los bordes extremos.
  Forma ovalada amplia.
- **2 pétalos-delantal inferiores frontales:** salen desde la zona del collar
  hacia adelante y ligeramente hacia abajo, creando un efecto de falda abierta
  al frente. Marfil con punta más pronunciada en lavanda orquídea. Forma
  alargada curvada hacia afuera.

**Total: 5 pétalos. Ni más ni menos. No son radiales simétricos.**

### Cabeza-cristal

Esfera de cristal opalescente iridiscente ligeramente achatada, flotando justo
por encima del collar ámbar. Superficie lisa sin boca, sin nariz, sin cejas,
sin pestañas.

**Únicos rasgos:** dos ojos en forma de media luna cerrada (sonrisa de ojos
felices, tipo `ᴗ ᴗ`) en lavanda luminoso suave con glow interno.

### Collar ámbar

Anillo delgado horizontal de luz amarillo ámbar cálido, ubicado entre la
cabeza-cristal y el cuerpo-bulbo. Emite glow cálido suave hacia arriba (ilumina
la base de la cabeza) y hacia abajo (ilumina la parte superior del bulbo y los
pétalos-delantal).

### Cuerpo-bulbo

Vaina/capullo marfil mate con forma de gota invertida alargada. Cuelga debajo
del collar ámbar. Segmentación vertical marcada con líneas divisorias que
corren de arriba hacia abajo, como gajos de una cápsula de orquídea cerrada.

**No tiene brazos, no tiene piernas, no tiene alas de hada, no tiene patas ni base.**

### Estela

Partículas finas blanco-doradas tipo polvo lumínico digital. Concentradas
cerca del cuerpo, dispersándose hacia afuera. Sutiles, nunca densas.

---

## Materiales (para producción 3D futura)

| Elemento | baseColor | Notas técnicas |
|---|---|---|
| Pétalos | Marfil `#F4EBD9` con gradient mask a lavanda `#B896C4` en puntas | Subsurface scattering cálido bajo, roughness 0.35, normal sutil de nervaduras |
| Cabeza-cristal | Opalescente iridiscente lavanda-nácar | Transparencia parcial, iridiscencia, emisión interna muy baja para los ojos |
| Ojos (media luna) | Lavanda luminoso `#B896C4` | Emisión media con glow interior, bloom muy sutil |
| Collar | Ámbar `#F2D48A` | Emisión media, bloom cálido |
| Bulbo-cuerpo | Crema `#EADFC8` | Roughness 0.55, sin metalicidad, normal de segmentación vertical |
| Estela | Blanco-dorado | Partículas finas, sistema procedural |

---

## Paleta

**Dominante:** marfil cremoso + acentos lavanda orquídea.  
**Firma luminosa:** ámbar cálido del collar.  
**Ambiente:** bruma lavanda cálida desenfocada.

| Color | Hex | Uso |
|---|---|---|
| Papel marfil | `#F4EBD9` | Base de pétalos |
| Crema cálida | `#EADFC8` | Bulbo-cuerpo |
| Bruma lavanda | `#D4CAD8` | Fondo/atmósfera |
| Lavanda orquídea | `#B896C4` | Puntas de pétalos, glow de ojos |
| Ámbar brillo | `#F2D48A` | Collar luminoso |

---

## Escala y comportamiento

- **Escala imaginaria:** palm-sized (15–20 cm).
- **Locomoción:** flota, nunca se apoya en superficie.
- **Micro-movimiento idle:** oscilación vertical muy lenta + respiración sutil
  de pétalos (apertura/cierre apenas perceptible).
- **Parpadeo:** muy ocasional, las medias lunas se achatan un instante y vuelven.

---

## Estados emocionales definidos

- **Base (neutral):** idle flotando, ojos media-luna estándar, pétalos en
  posición canónica, estela sutil.
- **Calma profunda:** ojos más cerrados y planos, pétalos recogidos, estela
  mínima, glow del collar más tenue.
- **Curiosidad activa:** cabeza inclinada 15° hacia un lado, ojos con glow más
  brillante, pétalos más abiertos y alertas, estela más activa, glow del
  collar más intenso.

---

## Prohibiciones absolutas (negative spec)

Lía **nunca** debe tener:

- Boca, nariz, cejas, pestañas, labios, dientes, mejillas ni ningún rasgo facial humano.
- Cara humana.
- Brazos, manos, dedos.
- Piernas, pies, base de apoyo.
- Alas de hada.
- Aura mágica densa ni partículas doradas excesivas.
- Expresión caricaturesca o sobreactuada.
- Más o menos de 5 pétalos.
- Pétalos en disposición radial simétrica tipo flor de margarita.

---

## Assets visuales disponibles

### Referencia original
- `reference-original.jpg` — Generada previamente con Grok Images.

### Turnaround (vistas canónicas)
- `turnaround/a1-front.png` — Vista frontal pura.
- `turnaround/a2-three-quarter-front.png` — Tres cuartos frontal derecha.
- `turnaround/a3-side-profile.png` — Perfil lateral derecho.
- `turnaround/a4-three-quarter-back.png` — Tres cuartos trasera derecha.
- `turnaround/a5-back.png` — Vista trasera pura.

### Detalles y estados
- `details/b1-top-down.png` — Vista cenital superior.
- `details/b2-face-closeup.png` — Close-up del rostro-cristal.
- `details/b3-state-calm.png` — Estado emocional: calma profunda.
- `details/b4-state-curious.png` — Estado emocional: curiosidad activa.

### Model sheet
- `model-sheet/c1-full-turnaround.png` — Lámina compuesta con las 5 vistas
  del turnaround alineadas horizontalmente.

---

## Estado del pipeline

- [x] Referencia original consolidada
- [x] Turnaround de vistas canónicas
- [x] Detalles y estados emocionales
- [x] Model sheet compuesto
- [x] Spec cerrada
- [ ] Aprobación final para producción 3D
- [ ] Generación de malla base (Meshy/Tripo)
- [ ] Retopología y UVs
- [ ] Texturizado PBR
- [ ] Rigging mínimo (5 huesos de tallo + blendshapes)
- [ ] Animaciones idle
- [ ] Integración en shell de la app
