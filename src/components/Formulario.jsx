import { useState, useEffect } from 'react';
import Error from './Error';

const Formulario = ({
  pacientes, setPacientes, paciente, setPaciente,
}) => {
  const [nombre, setNombre] = useState('');
  const [responsable, setResponsable] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (paciente && Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setResponsable(paciente.responsable);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const currentDate = Date.now().toString(36);
    return random + currentDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacion del formulario
    if ([nombre, responsable, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    // Objeto de paciente
    const objetoPaciente = {
      nombre,
      responsable,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      // Editando el registro
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map((pacienteState) => (
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState));
      setPacientes(pacientesActualizados);
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
      setPaciente({});
    }

    // Reiniciar el formulario

    setNombre('');
    setResponsable('');
    setEmail('');
    setFecha('');
    setSintomas('');
    setError(false);
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y
        {' '}

        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-7 px-5 mb-10"
      >
        {
                    // VALIDACION DE ERROR
                }
        { error
                && (
                <Error>
                  <p>Todos los campos son obligatorios</p>
                </Error>
                ) }

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="responsable" className="block text-gray-700 uppercase font-bold">
            Nombre Responsable
          </label>
          <input
            id="responsable"
            type="text"
            placeholder="Nombre del responsable"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            value={responsable}
            onChange={(e) => setResponsable(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email del responsable"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
            Fecha de Alta
          </label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-1">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 m-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full rounded-md p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />

      </form>
    </div>
  );
};

export default Formulario;
