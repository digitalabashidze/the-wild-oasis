import { useForm } from 'react-hook-form'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

import { useCreateCabin } from './useCreateCabin'
import { useUpdateCabin } from './useUpdateCabin'

function CreateCabinForm({ onClose, cabinToUpdate = {} }) {
	const { isCreating, createCabin } = useCreateCabin()
	const { isUpdating, updateCabin } = useUpdateCabin()
	const isWorking = isCreating || isUpdating

	const { id: updateId, ...updateValue } = cabinToUpdate

	const isUpdateSession = Boolean(updateId)

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isUpdateSession ? updateValue : {},
	})

	const { errors } = formState

	function onSubmit(data) {
		const image = typeof data.image === 'string' ? data.image : data.image[0]

		if (isUpdateSession)
			updateCabin(
				{ newCabinData: { ...data, image }, id: updateId },
				{ onSuccess: () => reset() },
				onClose?.()
			)
		else
			createCabin(
				{ ...data, image: data.image[0] },
				{ onSuccess: () => reset() },
				onClose?.()
			)
	}

	function onError(errors) {
		console.error(errors)
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onClose ? 'modal' : 'regular'}
		>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					id='maxCapacity'
					disabled={isWorking}
					{...register('maxCapacity', {
						required: 'This field is required',
						min: {
							value: 1,
							message: 'Capacity should be at least 1',
						},
					})}
				/>
			</FormRow>

			<FormRow label='Regular Price' error={errors?.regularPrice?.message}>
				<Input
					type='number'
					id='regularPrice'
					disabled={isWorking}
					{...register('regularPrice', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					id='discount'
					defaultValue={0}
					disabled={isWorking}
					{...register('discount', {
						required: 'This field is required',
						validate: value =>
							Number(getValues().regularPrice) > Number(value) ||
							'Discount should be less than regular price',
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}
			>
				<Textarea
					type='number'
					id='description'
					defaultValue=''
					disabled={isWorking}
					{...register('description', { required: 'This field is required' })}
				/>
			</FormRow>

			<FormRow label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register('image', {
						required: isUpdateSession ? false : 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onClose?.()}>
					Cancel
				</Button>
				<Button disable={isWorking}>
					{isUpdateSession ? 'Edit cabin' : 'Create new cabin'}
				</Button>
			</FormRow>
		</Form>
	)
}

export default CreateCabinForm
