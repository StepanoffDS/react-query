import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addTodo, fetchTodos } from './api'
const Demo = () => {
	const [title, setTitle] = React.useState('')

	const queryClient = useQueryClient()
	const { data: todos, isLoading } = useQuery({
		queryFn: () => fetchTodos(),
		queryKey: ['todos'],
	})

	const { mutateAsync: addTodoMutation } = useMutation({
		mutationFn: addTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		},
	})

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='m-5 d-flex justify-content-center flex-column'>
			<h2 className='h2 mb-4'>React Query</h2>
			<div>
				<input
					type='text'
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<button
					onClick={async () => {
						try {
							await addTodoMutation({ title })
							setTitle('')
						} catch (e) {
							console.log(e)
						}
					}}
				>
					Add Todo
				</button>
			</div>
			<ul className='list-group'>
				{todos?.map((todo) => {
					return (
						<li key={todo.id} className='list-group-item'>
							<input
								type='checkbox'
								className='form-check-input me-2'
								defaultChecked={todo.completed}
								id={`todo-${todo.id}`}
							/>
							<label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default Demo
