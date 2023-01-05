import Paciente from './Paciente.jsx';

const ListadoPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => (
  <div className="md:w-1/2 lg:w-3/5 md:h-screen">

    { pacientes && pacientes.length ? (
      <>
        <h2 className="font-black text-3xl text-center">Listado Pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Administra tus
          {' '}

          <span className="text-indigo-600 font-bold">Pacientes y citas</span>
        </p>
        <div className="md:h-screen md:h-4/6 overflow-y-scroll">

          { pacientes.map((paciente) => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}
              eliminarPaciente={eliminarPaciente}
            />
          ))}

        </div>
      </>
    ) : (
      <>
        <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
        <p className="text-xl mt-5 mb-10 text-center">
          Comienza agregando
          {' '}

          <span className="text-indigo-600 font-bold">nuevos pacientes</span>
        </p>
      </>
    )}

  </div>
);

export default ListadoPacientes;
