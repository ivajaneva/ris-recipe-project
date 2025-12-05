package vaja1.ris.vaja1Ris.services;

import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import vaja1.ris.vaja1Ris.models.Recipe;

import java.io.IOException;
import java.util.List;

public class PdfRecipeFormatter {

    public static float drawTitle(PDPageContentStream content, float y, Recipe recipe) throws IOException{
        content.setFont(new PDType1Font(org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName.HELVETICA_BOLD), 20);

        content.beginText();
        content.newLineAtOffset(PdfLayoutUtil.MARGIN, y);
        content.showText(recipe.getName());
        content.endText();

        PdfLayoutUtil.drawLine(content, PdfLayoutUtil.MARGIN, y - 5, 550);
        return y-40;
    }
    public static float drawWrappedText(PDPageContentStream content, float y, String label, String value) throws IOException {
        content.setFont(new PDType1Font(org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName.HELVETICA_BOLD), 14);

        content.beginText();
        content.newLineAtOffset(PdfLayoutUtil.MARGIN, y);
        content.showText(label);
        content.endText();
        y -= 20;

        content.setFont(new PDType1Font(org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName.HELVETICA), 12);

        List<String> lines = PdfTextUtil.wrapText(value, 500, new PDType1Font(org.apache.pdfbox.pdmodel.font.Standard14Fonts.FontName.HELVETICA), 12);

        for (String line : lines) {
            content.beginText();
            content.newLineAtOffset(PdfLayoutUtil.MARGIN, y);
            content.showText(line);
            content.endText();
            y = PdfLayoutUtil.lineSpacing(y);
        }
        return PdfLayoutUtil.sectionSpacing(y);
    }
}
