<script setup>
import hrImage from '../../images/about-hr.webp';
</script>

<template>
	<section id="about" class="flex h-screen flex-col">
		<div
			class="flex h-2/6 flex-col justify-end bg-[oklch(97.15%_0.0281_95.89)] pb-15 md:pb-10"
		>
			
				<h1 data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" class="title text-center">
					where nature meets<br />performance
				</h1>
			
		</div>

		<div class="flex flex-grow flex-col bg-[oklch(58.59%_0.1241_68.63)]">
			<div>
				<img :src="hrImage" alt="" class="-mt-1" aria-hidden />
			</div>
			<div
				class="flex h-full flex-col items-center justify-center gap-4 p-1"
			>
				
					<p data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" class="sub-title max-w-4xl text-center">
						A game-changer in athlete's nutrition,
						<b>NÜenergy™</b> is the perfect energy gel for fuelling
						during tough workouts, like gym sessions, bike rides, or
						runs. Plus, it's great for post-exercise recovery too.
					</p>
				

				
					<p data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" class="sub-title max-w-4xl text-center">
						<b>NÜenergy™</b> is made from the innovative
						<a
							href="https://coconutrate.com/"
							class="font-bold hover:underline"
							target="_blank"
						>
							COCOnutrate™</a
						>
						, a 100% organic certified multi-nutrient sourced
						naturally from coconut nectar, and with just two other
						friendly ingredients: sea salt and natural flavor.
						Packed with benefits and delicious flavor!
					</p>
				
			</div>
		</div>
	</section>
</template>
