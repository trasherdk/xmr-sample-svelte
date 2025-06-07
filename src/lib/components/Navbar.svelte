<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/contact">Contact</a></li>
	</ul>
</nav>

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		background-color: var(--surface-1);
		ul {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 0 1rem;
			li {
				list-style: none;
				margin: 0 1rem;
				a {
					text-decoration: none;
				}
			}
		}
	}
</style>
