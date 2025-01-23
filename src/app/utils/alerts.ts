/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastOptions } from 'react-toastify'
import get from 'lodash/get'

type ErrorCatch = { [x: string]: any }

export function exibirToastSuccess(
  mensagem: string,
  config?: ToastOptions,
) {
  return toast.success(mensagem, config)
}

export function exibirErrorCatch(e: unknown): void {
  const err = e as ErrorCatch
  const message = 'Algo deu errado, tente novamente mais tarde'

  if (err?.response?.data?.message) {
    toast.error(get(err, 'response.data.message', message))

    return
  }

  if (err?.message) {
    toast.error(get(err, 'message', message))

    return
  }

  toast.error(get(err, 'response.data.message', message))
}
