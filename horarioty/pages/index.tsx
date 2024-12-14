import { useState, ChangeEvent } from 'react';

interface Clase {
  hora: string;
  materia: string;
}

interface Horario {
  turno: string;
  clases: Clase[];
}

interface Horarios {
  matutino: Horario;
  vespertino: Horario;
}

interface MateriasPorSemestre {
  [key: number]: string[];
}

interface MateriasPorCarrera {
  [key: string]: MateriasPorSemestre;
}

export default function Home() {
  const [carrera, setCarrera] = useState<string>('');
  const [semestre, setSemestre] = useState<string>('');
  const [horarios, setHorarios] = useState<Horarios | null>(null);
  const [archivo, setArchivo] = useState<File | null>(null);

  const carreras: string[] = [
    'Ingenieria en sistemas computacionales',
    'Ingenieria industrial', 
    'Ingenieria en gestion empresarial',
    'Administracion de empresas',
    'Arquitectura'
  ];

  const semestres: number[] = Array.from({length: 8}, (_, i) => i + 2);

  const materiasPorCarrera: MateriasPorCarrera = {
    'Ingenieria en sistemas computacionales': {
      2: ['Progrccamación Básica', 'Matemáticas Discretas', 'Cálculo', 'Física', 'Álgebra Lineal', 'Ética Profesional'],
      3: ['Estructura de Datos', 'Programación POO', 'Probabilidad', 'Arquitectura', 'Circuitos', 'Desarrollo Humano'],
      4: ['Programación Avanzada', 'Bases de Datos', 'Redes', 'Sistemas Operativos', 'Métodos Numéricos', 'Comunicación Efectiva'],
      5: ['Desarrollo Web', 'BD Avanzadas', 'Redes Avanzadas', 'SO Distribuidos', 'Graficación', 'Liderazgo'],
      6: ['Desarrollo Móvil', 'Seguridad', 'Cloud Computing', 'IA Básica', 'Gestión de Proyectos', 'Emprendimiento'],
      7: ['DevOps', 'Big Data', 'IoT', 'IA Avanzada', 'Emprendimiento', 'Metodología de Investigación'],
      8: ['Blockchain', 'Machine Learning', 'Sistemas Distribuidos', 'Proyecto Terminal', 'Ética', 'Desarrollo Sustentable'],
      9: ['Tesis', 'Deep Learning', 'Computación Cuántica', 'Innovación', 'Servicio Social', 'Residencias']
    },
    'Ingenieria industrial': {
      2: ['Dibujo Industrial', 'Química Industrial', 'Cálculo', 'Física', 'Probabilidad', 'Ética Profesional'],
      3: ['Procesos de Manufactura I', 'Materiales', 'Estadística', 'Termodinámica', 'Mecánica', 'Desarrollo Humano'],
      4: ['Procesos de Manufactura II', 'Control de Calidad', 'Investigación de Operaciones', 'Ergonomía', 'Costos', 'Comunicación Efectiva'],
      5: ['Logística', 'Gestión de Calidad', 'Seguridad Industrial', 'Lean Manufacturing', 'Finanzas', 'Liderazgo'],
      6: ['Cadena de Suministro', 'Six Sigma', 'Automatización', 'Planeación Estratégica', 'Gestión de Proyectos', 'Emprendimiento'],
      7: ['Diseño de Plantas', 'Mejora Continua', 'Simulación Industrial', 'Sustentabilidad', 'Emprendimiento', 'Metodología de Investigación'],
      8: ['Proyecto Industrial', 'Manufactura 4.0', 'Gestión de Mantenimiento', 'Ética Profesional', 'Innovación', 'Desarrollo Sustentable'],
      9: ['Tesis', 'Industria 4.0', 'Gestión Tecnológica', 'Servicio Social', 'Residencias', 'Seminario']
    },
    'Ingenieria en gestion empresarial': {
      2: ['Contabilidad', 'Economía', 'Estadística', 'Derecho Mercantil', 'Administración', 'Ética Profesional'],
      3: ['Costos', 'Microeconomía', 'Probabilidad', 'Marketing', 'Comportamiento Organizacional', 'Desarrollo Humano'],
      4: ['Finanzas', 'Macroeconomía', 'Investigación de Mercados', 'Recursos Humanos', 'Producción', 'Comunicación Efectiva'],
      5: ['Finanzas Corporativas', 'Marketing Digital', 'Gestión del Talento', 'Calidad', 'Logística', 'Liderazgo'],
      6: ['Proyectos de Inversión', 'E-commerce', 'Desarrollo Organizacional', 'Six Sigma', 'Cadena de Suministro', 'Emprendimiento'],
      7: ['Estrategia Empresarial', 'Analytics', 'Consultoría', 'Innovación', 'Plan de Negocios', 'Metodología de Investigación'],
      8: ['Dirección Estratégica', 'Business Intelligence', 'Gestión del Cambio', 'Ética', 'Emprendimiento', 'Desarrollo Sustentable'],
      9: ['Tesis', 'Transformación Digital', 'Liderazgo', 'Servicio Social', 'Residencias', 'Seminario']
    },
    'Administracion de empresas': {
      2: ['Contabilidad Básica', 'Economía', 'Matemáticas Financieras', 'Derecho', 'Metodología', 'Ética Profesional'],
      3: ['Contabilidad Intermedia', 'Microeconomía', 'Estadística', 'Derecho Laboral', 'Administración', 'Desarrollo Humano'],
      4: ['Contabilidad Avanzada', 'Macroeconomía', 'Marketing', 'Recursos Humanos', 'Finanzas', 'Comunicación Efectiva'],
      5: ['Auditoría', 'Comercio Internacional', 'Marketing Digital', 'Desarrollo Humano', 'Presupuestos', 'Liderazgo'],
      6: ['Fiscal', 'Negocios Internacionales', 'Investigación de Mercados', 'Capacitación', 'Finanzas Corporativas', 'Emprendimiento'],
      7: ['Consultoría', 'Estrategia', 'Plan de Marketing', 'Desarrollo Organizacional', 'Proyectos', 'Metodología de Investigación'],
      8: ['Dirección', 'Emprendimiento', 'E-commerce', 'Liderazgo', 'Plan de Negocios', 'Desarrollo Sustentable'],
      9: ['Tesis', 'Innovación', 'Gestión del Cambio', 'Servicio Social', 'Residencias', 'Seminario']
    },
    'Arquitectura': {
      2: ['Diseño Básico', 'Dibujo Arquitectónico', 'Matemáticas', 'Historia del Arte', 'Materiales', 'Ética Profesional'],
      3: ['Diseño Arquitectónico I', 'Geometría', 'Estructuras I', 'Historia Antigua', 'Construcción I', 'Desarrollo Humano'],
      4: ['Diseño Arquitectónico II', 'Perspectiva', 'Estructuras II', 'Historia Medieval', 'Construcción II', 'Comunicación Efectiva'],
      5: ['Diseño Arquitectónico III', 'Instalaciones', 'Estructuras III', 'Historia Moderna', 'Construcción III', 'Liderazgo'],
      6: ['Diseño Arquitectónico IV', 'Urbanismo', 'Estructuras IV', 'Historia Contemporánea', 'Construcción IV', 'Emprendimiento'],
      7: ['Diseño Integral', 'Planificación', 'Costos', 'Restauración', 'Sustentabilidad', 'Metodología de Investigación'],
      8: ['Proyecto Ejecutivo', 'Diseño Urbano', 'Administración', 'Conservación', 'Tecnología BIM', 'Desarrollo Sustentable'],
      9: ['Tesis', 'Arquitectura Sostenible', 'Gestión de Proyectos', 'Servicio Social', 'Residencias', 'Seminario']
    }
  };

  const generarHorario = (): void => {
    if (carrera && semestre) {
      const semestreNum = parseInt(semestre);
      const materiasCarrera = materiasPorCarrera[carrera][semestreNum];
      
      if (!materiasCarrera) {
        setHorarios(null);
        return;
      }

      const horarioMatutino: Horario = {
        turno: 'Matutino (8:00 AM - 2:00 PM)',
        clases: [
          { hora: '8:00 - 9:00', materia: materiasCarrera[0] },
          { hora: '9:00 - 10:00', materia: materiasCarrera[1] },
          { hora: '10:00 - 11:00', materia: materiasCarrera[2] },
          { hora: '11:00 - 12:00', materia: materiasCarrera[3] },
          { hora: '12:00 - 1:00', materia: materiasCarrera[4] },
          { hora: '1:00 - 2:00', materia: materiasCarrera[5] }
        ]
      };

      const horarioVespertino: Horario = {
        turno: 'Vespertino (2:00 PM - 8:00 PM)',
        clases: [
          { hora: '2:00 - 3:00', materia: materiasCarrera[5] },
          { hora: '3:00 - 4:00', materia: materiasCarrera[4] },
          { hora: '4:00 - 5:00', materia: materiasCarrera[3] },
          { hora: '5:00 - 6:00', materia: materiasCarrera[2] },
          { hora: '6:00 - 7:00', materia: materiasCarrera[1] },
          { hora: '7:00 - 8:00', materia: materiasCarrera[0] }
        ]
      };

      setHorarios({ matutino: horarioMatutino, vespertino: horarioVespertino });
    }
  };

  const manejarArchivo = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files && files[0]) {
      const archivo = files[0];
      if (archivo.type === 'application/pdf') {
        setArchivo(archivo);
      } else {
        alert('Por favor, sube solo archivos PDF');
        e.target.value = '';
      }
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center text-black">Generador de Horarios por Semestre</h1>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-4 mb-6">
          <select
            value={carrera}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setCarrera(e.target.value)}
            className="p-2 border rounded text-black"
          >
            <option value="">Selecciona tu carrera</option>
            {carreras.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <select
            value={semestre}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSemestre(e.target.value)}
            className="p-2 border rounded text-black"
          >
            <option value="">Selecciona el semestre</option>
            {semestres.map(s => (
              <option key={s} value={s}>{s}° Semestre</option>
            ))}
          </select>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subir documento PDF
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={manejarArchivo}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {archivo && (
              <p className="mt-2 text-sm text-gray-600">
                Archivo seleccionado: {archivo.name}
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={generarHorario}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Generar Horario
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-black">Información Seleccionada:</h2>
          <div className="border rounded p-4">
            {carrera && <p className="font-semibold text-black">Carrera: <span className="font-normal text-black">{carrera}</span></p>}
            {semestre && <p className="font-semibold text-black">Semestre: <span className="font-normal text-black">{semestre}° Semestre</span></p>}
            {!carrera && !semestre && <p className="text-black">Selecciona una carrera y semestre para generar tu horario</p>}
          </div>
        </div>

        {horarios && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Horarios Disponibles:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Horario Matutino */}
              <div className="border rounded p-4">
                <h3 className="font-bold mb-3 text-black">{horarios.matutino.turno}</h3>
                <ul>
                  {horarios.matutino.clases.map((clase, index) => (
                    <li key={index} className="mb-2 p-2 bg-gray-50 rounded">
                      <span className="font-semibold text-black">{clase.hora}</span>
                      <br />
                      <span className="text-black">{clase.materia}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Horario Vespertino */}
              <div className="border rounded p-4">
                <h3 className="font-bold mb-3 text-black">{horarios.vespertino.turno}</h3>
                <ul>
                  {horarios.vespertino.clases.map((clase, index) => (
                    <li key={index} className="mb-2 p-2 bg-gray-50 rounded">
                      <span className="font-semibold text-black">{clase.hora}</span>
                      <br />
                      <span className="text-black">{clase.materia}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}