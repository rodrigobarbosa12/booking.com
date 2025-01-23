import Swal from 'sweetalert2'
import withReactContent, {
  ReactSweetAlertOptions,
} from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const message = ({ ...rest }: ReactSweetAlertOptions) =>
  MySwal.fire({
    ...rest,
  })

interface WarningRemoveProps extends ReactSweetAlertOptions {
  titulo: string
  texto: string
}

const confirmation = ({ titulo, texto, ...rest }: WarningRemoveProps) =>
  MySwal.fire({
    ...rest,
    customClass: {
      container: 'custom-sweet-alert-2',
    },
    html: (
      <div>
        <h1>
          <b>{titulo}</b>
        </h1>
        <p
          className="card-text my-1 text-secondary"
          style={{ textAlign: 'center' }}
        >
          {texto}
        </p>
      </div>
    ),
  })

export const AlertReact = {
  message,
  confirmation,
}
