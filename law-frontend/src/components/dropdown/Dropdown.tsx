import { format } from 'date-fns';
import { BsChevronDown } from 'react-icons/bs';

import { Additional } from '../../types/Document.interface';

import './style.scss';

type Props = {
	additional?: Additional[];
};
export const Dropdown = ({ additional }: Props) => {
	return (
		<main className="w-full mx-auto mt-2.5">
			<section className="shadow row">
				<div className="tabs">
					{additional?.map((item, i) => (
						<div className="border-b tab" key={i}>
							<div className="border-l-2 border-transparent relative">
								<input
									className="w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6"
									type="checkbox"
									id="chck1"
								/>
								<div className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label">
									<span className="text-grey-darkest dark:text-gray-300 font-thin text-xl">
										Допсоглошение {i + 1}
									</span>
									<div className="rounded-full border border-grey w-7 h-7 flex items-center justify-center test">
										<BsChevronDown className="dark:text-teal-300" />
									</div>
								</div>
								<div className="tab-content">
									<div className="pl-8 pr-8 pb-5 text-grey-darkest">
										<>
											{item.type === 'extend' ? (
												<p className="ext-grey-darkest dark:text-gray-300 font-thin text-lg">
													Продлен от{' '}
													{format(
														new Date(),
														'dd/LL/yyyy'
													)}
												</p>
											) : (
												<p className="ext-grey-darkest dark:text-gray-300 font-thin text-lg">
													Расторгнут
												</p>
											)}
										</>
										<div>
											<a
												href={`http://localhost:3333/${item.filePath}`}
											>
												{item.fileName}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</main>
	);
};
