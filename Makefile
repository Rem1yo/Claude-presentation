.PHONY: run status save

run:
	open index.html

status:
	git status

save:
	git add -A
	git commit -m "$(msg)"
	git push
