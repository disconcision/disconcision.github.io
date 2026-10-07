# Builds the CV PDF that the site serves (cv/andrewblinncv.pdf):
#   make -C cv/src
# The PDF is dated with \today, so update the date in cv/index.html to match.
pdf:
	latexmk -pdf -interaction=nonstopmode -outdir=build resume.tex
	cp build/resume.pdf ../andrewblinncv.pdf

.PHONY: pdf
